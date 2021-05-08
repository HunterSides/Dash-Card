login({cardNumber, token}) {
    return this.fetch('/login', {
      method: 'POST',
      body: {cardNumber, token}
    }).then(rsp => {
      if (rsp.ok) {
        localStorage.authToken = rsp.data.token
        return this.getAccount()
      }
      return rsp
    })
  }

  getAccount(opts = {preventRedirect: false}) {
    const authToken = opts.authToken || localStorage.authToken
    if (!authToken) {
      return Promise.resolve({ok: false})
    }
    return this.fetch(`/account`, {authToken}).then(rsp => {
      if (rsp.ok) {
        const authContext = {}
        if (_.has(rsp, 'data.user')) {
          authContext.user = new User(rsp.data.user)
        }
        if (_.has(rsp, 'data.device')) {
          authContext.device = new Device(rsp.data.device)
        }
        if (_.has(rsp, 'data.company')) {
          authContext.company = new Company(rsp.data.company)
        }
        if (_.has(rsp, 'data.accountLimits')) {
          authContext.accountLimits = rsp.data.accountLimits
        }
        if (_.has(rsp, 'data.permissions')) {
          authContext.permissions = rsp.data.permissions
        }
        if (_.has(rsp, 'data.menu')) {
          authContext.menu = rsp.data.menu
        }
        this.context = authContext
        this.updateContext(this.context)
        this.connectWebsocket()
      } else {
        if (!opts.preventRedirect) {
          this.updateContext({startRedirect: true})
        }
      }
      return rsp
    })
  }
  
  getStoreCard({id, pin}) {
    return this.fetch(`/store-cards/${id}`, {
      method: 'POST',
      body: {id, pin},
    })
  }
  
  storeCardPinVerify({storeCardId, pin, paymentId, exchangeId}) {
    return this.fetch(`/store-cards/${storeCardId}/pin-verify`, {
      method: 'POST',
      body: {pin, paymentId, exchangeId},
    })
  }


  fetch(url, opts = {}, query) {
    url = config.get().apiUrl + url

    if (query) {
      // query = _.defaults(query, {page: 0, perPage: 50})
      url += queryString(query)
    }

    opts.headers = opts.headers || {}

    if (localStorage.authToken) {
      opts.headers['Authorization'] = `Bearer ${localStorage.authToken}`
    }
    if (opts.authToken) {
      opts.headers['Authorization'] = `Bearer ${opts.authToken}`
    }

    if (opts.device || this.context.device) {
      opts.headers['X-Device'] = opts.device ?
        `${opts.device.id},${opts.device.code}` :
        `${this.context.device.id},${this.context.device.code}`
    }

    if (_.includes(['POST', 'PUT', 'DELETE'], opts.method)) {
      opts.headers['Content-Type'] = 'application/json'
      opts.body = JSON.stringify(opts.body)
    }

    return parseResponseJson(fetch(url, opts)).then(rsp => {
      if (!rsp.ok) {
        return this.handleApiErrorResponse(rsp)
      }
      return rsp
    }).catch(err => {
      return this.handleApiErrorResponse(err)
    })
  }

  handleApiErrorResponse(rsp) {
    if (typeof this.errorHandler !== 'undefined') {
      return this.errorHandler(rsp)
    }
    return rsp
  }

const api = new Api()
window.api = api

login({cardNumber, token}){
    
}