import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import packageJson from 'package.json';

const APP = packageJson.name;
const USER_PROFILE = 'userProfile';
const CLIENT_ID = 'clientId';

interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public deduct_points: number = 0;
  public new_points: number = 0;
  public old_points: number = 0;
  public userProfile: UserProfile | null = null;
  public clientId: string = null;
  public activeSession: string = null;

  constructor(
    public electronService: ElectronService,
    private authService: MsalService,
    private http: HttpClient,
  ) {
    const clientId = window.sessionStorage.getItem(CLIENT_ID);
    if (clientId) {
      this.clientId = clientId;
    } else {
      this.clientId = nanoid();
      window.sessionStorage.setItem(CLIENT_ID, this.clientId);
    }
    
    this.initializeUserProfile();
  }

  async initializeUserProfile() {
    if (this.electronService.isElectron) {
      const userProfile = window.localStorage.getItem(USER_PROFILE);
      if (userProfile) {
        this.setUserProfile(JSON.parse(userProfile));
      } else {
        this.setUserProfile(null);
      }
    } else {
      const isLoggedIn = this.authService.instance.getAllAccounts().length > 0;
      if (isLoggedIn) {
        const listClaims = this.getClaims(this.authService.instance.getActiveAccount()?.idTokenClaims as Record<string, any>);

        this.setUserProfile({
          uid: listClaims.find(item => item.claim === "sub")?.value,
          email: listClaims.find(item => item.claim === "emails")?.value[0],
          firstName: listClaims.find(item => item.claim === "given_name")?.value,
          lastName: listClaims.find(item => item.claim === "family_name")?.value
        });
      } else {
        this.setUserProfile(null);
      }
    }
  }

  setUserProfile(userProfile: UserProfile | null) {
    this.userProfile = userProfile;
    window.localStorage.setItem(USER_PROFILE, JSON.stringify(userProfile));
    if (this.userProfile) {
      this.setActiveSession();
    } else {
      this.activeSession = null;
    }
  }

  setActiveSession() {
    if (this.userProfile) {
      axios.post(environment.SessionURL, {
        uid: this.userProfile.uid,
        app: APP,
        session_id: this.clientId,
      });
    }
  }

  getClaims(claims: Record<string, any>) {
    const listClaims = []
    if (claims) {
      Object.entries(claims).forEach((claim: [string, unknown], index: number) => {
        listClaims.push({ id: index, claim: claim[0], value: claim[1] });
      });
    }
    return listClaims;
  }
}
