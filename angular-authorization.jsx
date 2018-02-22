
angular.module('client')
      .config(RouteConfig)
      .run(StateAuthorization)

   StateAuthorization.$inject = ['$transitions', '$state', 'userService']

   //a function that uses transition hooks to authorize the current user using cookies
   function StateAuthorization($transitions, $state, userService) {
      $transitions.onBefore({}, (transition) => {

         if (transition.to().data && transition.to().data.roles) {
            const stateService = transition.router.stateService
            const permissions = transition.to().data.roles

            let currentRole = userService.getUserRole()

            if (currentRole === null) {
               return stateService.target('no-navbar.login')
            } else {
               let authorization = false
               for (let i = 0; i < permissions.length; i++) {
                  if (currentRole === permissions[i])
                     authorization = true;
               }

               if (!authorization) {
                  return stateService.target('site.userAuthentication.restricted')
               }
               return authorization
            }
         }
      })
   }