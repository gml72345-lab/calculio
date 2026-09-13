(function () {

  const GTM_ID = 'GTM-TDR2P53J';
  const STORAGE_KEY = 'calculio_cookie_consent';

  window.dataLayer = window.dataLayer || [];

  window.gtag = function () {
    dataLayer.push(arguments);
  };


  /* Consentement refusé par défaut */
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });


  let gtmLoaded = false;


  function loadGTM() {

    if (gtmLoaded) return;

    gtmLoaded = true;

    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    const script = document.createElement('script');

    script.async = true;
    script.src =
      'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;

    document.head.appendChild(script);
  }


  function acceptCookies() {

    localStorage.setItem(STORAGE_KEY, 'accepted');

    gtag('consent', 'update', {
      analytics_storage: 'granted',

      /* Publicité non utilisée actuellement */
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    loadGTM();

    hideBanner();
  }


  function refuseCookies() {

    localStorage.setItem(STORAGE_KEY, 'refused');

    gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    hideBanner();
  }


  function showBanner() {

    const banner = document.getElementById('calculio-cookie-banner');
    const manage = document.getElementById('calculio-manage-cookies');

    if (banner) banner.style.display = 'block';
    if (manage) manage.style.display = 'none';
  }


  function hideBanner() {

    const banner = document.getElementById('calculio-cookie-banner');
    const manage = document.getElementById('calculio-manage-cookies');

    if (banner) banner.style.display = 'none';
    if (manage) manage.style.display = 'block';
  }


  function createInterface() {

    const banner = document.createElement('div');

    banner.id = 'calculio-cookie-banner';

    banner.innerHTML = `
      <div style="
        position:fixed;
        left:50%;
        bottom:20px;
        transform:translateX(-50%);
        width:min(720px,92%);
        background:#fffdf9;
        color:#20232a;
        border:1px solid #d9d0c4;
        border-radius:16px;
        padding:20px;
        box-shadow:0 12px 40px rgba(0,0,0,.18);
        z-index:99999;
        font-family:Arial,Helvetica,sans-serif;
      ">

        <strong style="font-size:18px;">
          Votre confidentialité
        </strong>

        <p style="
          margin:10px 0 16px;
          line-height:1.5;
        ">
          Calculio utilise Google Analytics pour mesurer
          l’audience et améliorer le site. Vous pouvez accepter
          ou refuser ces traceurs.
          <a href="/cookies.html"
             style="color:#3154c8;">
            En savoir plus
          </a>
        </p>

        <div style="
          display:flex;
          gap:10px;
          flex-wrap:wrap;
        ">

          <button id="calculio-accept" style="
            padding:11px 17px;
            border:1px solid #3154c8;
            border-radius:9px;
            background:#3154c8;
            color:white;
            font-weight:bold;
            cursor:pointer;
          ">
            Tout accepter
          </button>

          <button id="calculio-refuse" style="
            padding:11px 17px;
            border:1px solid #62615d;
            border-radius:9px;
            background:#fffdf9;
            color:#20232a;
            font-weight:bold;
            cursor:pointer;
          ">
            Tout refuser
          </button>

        </div>

      </div>
    `;


    const manage = document.createElement('button');

    manage.id = 'calculio-manage-cookies';

    manage.textContent = 'Gérer mes cookies';

    manage.style.cssText = `
      position:fixed;
      bottom:12px;
      right:12px;
      z-index:99998;
      border:1px solid #d9d0c4;
      border-radius:8px;
      padding:8px 11px;
      background:#fffdf9;
      color:#20232a;
      font-size:12px;
      cursor:pointer;
      display:none;
    `;


    document.body.appendChild(banner);
    document.body.appendChild(manage);


    document
      .getElementById('calculio-accept')
      .addEventListener('click', acceptCookies);


    document
      .getElementById('calculio-refuse')
      .addEventListener('click', refuseCookies);


    manage.addEventListener('click', showBanner);


    const consent = localStorage.getItem(STORAGE_KEY);

    if (consent) {
      hideBanner();
    } else {
      showBanner();
    }
  }


  /* Si la personne avait déjà accepté */
  const savedConsent = localStorage.getItem(STORAGE_KEY);

  if (savedConsent === 'accepted') {

    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    loadGTM();
  }


  if (document.readyState === 'loading') {

    document.addEventListener(
      'DOMContentLoaded',
      createInterface
    );

  } else {

    createInterface();

  }

})();
