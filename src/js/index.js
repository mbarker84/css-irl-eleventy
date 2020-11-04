import menu from './menu'
import headerChange from './header'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      // registration.unregister().then(function(boolean) {
      //   console.log(boolean == true ? 'unregistered' : 'failed to unregister')
      // });
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
    // navigator.serviceWorker.getRegistrations().then( function(registrations) {
    //   for(let registration of registrations) {
    //     registration.unregister();
    //   }
    // });
  });
}

document.body.classList.remove('no-js')
menu()
headerChange()

