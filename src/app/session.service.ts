import {computed, inject, Injectable, signal} from '@angular/core';
import {ApiService, ISesData} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {


  api = inject(ApiService)
  constructor() {
    this.loadSession()
  }

  data = signal<ISesData | null>(null)

  authenticated = computed(() => {
    return !!this.data()?.user
  })

  async login(data : {password: string, username: string}) {
    this.data.set(await this.api.post_login(data))
  }

  async logout() {
    this.data.set(await this.api.post_logout())
  }

  async loadSession() {
    this.data.set(await this.api.get_session())
  }


}
