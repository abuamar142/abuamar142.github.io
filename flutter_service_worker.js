'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "19d8b35640d13140fe4e6f3b8d450f04",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "1165572f59d51e963a5bf9bdda61e39b",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"main.dart.js": "2287fda9ca4279560315421935a540f1",
"version.json": "575365fdce6a8a54d85286146b86ac28",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/fonts/MaterialIcons-Regular.otf": "a6f660ba1f0ca6c3721b7214d8260a35",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.json": "b2c3203e63615ed4ad8e3ed6636919a9",
"assets/AssetManifest.bin": "558f4c5245111cd0c4f032ac27ae8424",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/NOTICES": "b302f7425bd7f51c7fa0da217cfb1d21",
"assets/assets/icons/home.svg": "2b54bd79eb62c757df2b392cd363492e",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"manifest.json": "a71982e03e84ae5e29ec3291ab83cc93",
"index.html": "94f7af44e42189aa6be56b7117a6dca4",
"/": "94f7af44e42189aa6be56b7117a6dca4",
".git/hooks/applypatch-msg.sample": "4e33b997d7d5d5274c56bbf61f0c0bf9",
".git/hooks/commit-msg.sample": "89cb67435d2c1b9503e32d599d72713c",
".git/hooks/post-update.sample": "be48e56d8b9f9108aa4ecb32dd12d435",
".git/hooks/pre-applypatch.sample": "1f6a74774ee63312b4ad8a8c6ec7f2e8",
".git/hooks/pre-commit.sample": "3ba41bb5b6fe126be0c04c17ceb564ff",
".git/hooks/pre-merge-commit.sample": "f9d3ac247a941cf41ceb86048c699cfe",
".git/hooks/pre-push.sample": "a5a56d58c7133331b00b520ea5548074",
".git/hooks/pre-receive.sample": "c5e60ee055ef7b920a10b2871b1790a2",
".git/hooks/push-to-checkout.sample": "d8204d74ffd9ca215d1687eaca1e9e5b",
".git/hooks/sendemail-validate.sample": "c4c26785acacb2553117cf802723d09f",
".git/hooks/update.sample": "edce28be0c66a0a19729dc76f8143916",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/pre-rebase.sample": "0d4f0a0a63c6a1cbbf0a8b410b9e3c59",
".git/hooks/prepare-commit-msg.sample": "529551eb02ce07d5a84df03a8361e155",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/refs/heads/master": "7b66dc8635b60e301071318ace2edfd3",
".git/refs/remotes/origin/master": "7b66dc8635b60e301071318ace2edfd3",
".git/HEAD": "4cf2d64e44205fe628ddd534e1151b58",
".git/objects/4c/2eca5f73033109648a92c9c0056e26a8c23b71": "2fc7cb1b53fa0d879c6e42d5a764ad40",
".git/objects/8f/e7af5a3e840b75b70e59c3ffda1b58e84a5a1c": "e3695ae5742d7e56a9c696f82745288d",
".git/objects/03/eaddffb9c0e55fb7b5f9b378d9134d8d75dd37": "87850ce0a3dd72f458581004b58ac0d6",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/45/f800c6d6213619d9e4181c9c9f9e1bed2b5496": "9c0dd50d75ec47d5a97ca7d6f068bfd3",
".git/objects/45/3fc945e4bd4e3a59b7a516a81e3925ebb3838a": "c7c3ab95c8b1d986240a0248c93cf891",
".git/objects/8a/d41123112dcc05e645c65693277074ac106233": "3de645de309caa9346a728f03e403fdd",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/8a/f21684e63e61f688ae778e9dd9b9261a2a313a": "cb6ecbbab32ea4d0d02348ca2c376696",
".git/objects/e6/b745f90f2a4d1ee873fc396496c110db8ff0f3": "2933b2b2ca80c66b96cf80cd73d4cd16",
".git/objects/e6/67daab603b8f18ceee6131c9c236902171ba1f": "1945853699d1167a6cccb01bbbc48291",
".git/objects/35/91af41948adc8001f3586d76b91181311953fc": "c91d33b29071dcff3b2b3385383761cb",
".git/objects/a8/234e78324011301c932efde8dd789fba10495a": "5ad9ca983e505191e13f526cf3be6ade",
".git/objects/0b/60f2f02e193ac47134afacf53f2612e2516ae3": "89457c85b2c03f63f5aceb020179bdfd",
".git/objects/83/0e3d19e7f2ff19bbb4b955e3a38e3328837e12": "4412f19a8aebd49e1c2fb821b641e232",
".git/objects/db/b38ed8bd014d6fa2b4e2b6a1e2f8adbae2274b": "5753ac358546a7c7c7846ddbce10bedb",
".git/objects/d5/b54bd4a898b373f82bb1fa52b9580e7a976e3e": "943e27e1d359e2bc22daf20c70287c19",
".git/objects/e0/49c81f7cb35ebc411a3e1b547bf4ccf91292e8": "efad70dc0ca77a90ee53b5cc3be528ca",
".git/objects/fc/de1bb3df8c330568f07ef326d43d8ae3562897": "6e5bf2450330342c243afc3723b9c27e",
".git/objects/fc/40a63ee9cd85342ed1a449c4a79b1413a05c60": "ffe6508d359704dbe82a2168adde10a1",
".git/objects/d3/efa7fd80d9d345a1ad0aaa2e690c38f65f4d4e": "610858a6464fa97567f7cce3b11d9508",
".git/objects/d3/5528e95f0f0d9a3f3196cc44c0d9d427e5805e": "8db8075d2e1df5a1d6488bf8a6aac48f",
".git/objects/d1/7e96979f4fe625c23ef522ca6d43f063a2aaea": "5027013645644f83d75851b824427ed6",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/b0/eac4d383c930622215dae9e9eab9c5192aff1f": "2afd99dcab294860e04a4dafcb8678f5",
".git/objects/28/5bca766428f7d0686c469b93661c9e9d0c6d1c": "5abb0632ddacbb61e154e414457d6d96",
".git/objects/5b/9e6c452e9bd4c971058a7730e1febd3be6fe4e": "cd2c28ab38d0981153109787aad30b61",
".git/objects/08/f31d02667661ee76a83977e4565518a049b0ee": "5e2ed0cab1418ad1a356a0ad487e7d9b",
".git/objects/08/38c4fa7ef615f884b85c3b592b9247a7c08239": "66db22578017b3129f84d1c2f4a5c256",
".git/objects/08/8091c5cba14f8e5b33524de89fd4b778242586": "2098e7acbea42684961dd58ee3365606",
".git/objects/fa/81d0cc454e3cb76ad2b16e97d09d6e390c48ba": "9190dbcf22d3f0b88a877e19fbdd02ae",
".git/objects/fa/b9b39561ae35c46dc253e369a58e85dc5b4427": "68ef105de381e3c8e0c82a7108156413",
".git/objects/d7/2c11112c7cb4e2ce754bc41470f9b829a2d00a": "d7280a766a5d6033f187d874a92b5ad6",
".git/objects/53/7807567919e88db2866b7825339c57e94c24d8": "970aec5149a3dbe9370a9dc982cdd022",
".git/objects/df/7d2dcb89ab89da87467c0e1059b38c8d8f9296": "a44162ff357b024e4638ab18a9bb01c7",
".git/objects/bb/ac29f5ef7a40bf14c0901bc1457724156bc0de": "1393f20f0610cabefe2d4f45865b0f54",
".git/objects/cd/0545577105cab2694feef68042088c9b1f2b8b": "7210d91837f6eba19e697d558709bf94",
".git/objects/38/d56fb31a94ca358913c3705ba18fd4721ce856": "20aaf9c39ed5735443edc7203afca5e4",
".git/objects/78/42ccc429704556b0088f105115b705d38f2663": "28450f74e2938c7d8b87147ab659e640",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/68/7f989d6f3b43a57fc0c9b8060175926365e66d": "934dcc754c1dc861040aa6e332e6bf29",
".git/objects/b6/6e292849dc1000f02657ddb693061e5467d696": "a96955f2c1f90626e2e1a93437710bd9",
".git/objects/22/ff1b285d2d5a8ce9b35eab48c028e930acf29f": "2e6fb2bd971a4be22f636f6909580a0e",
".git/objects/12/b4d77f44b6fe329d4436d9679bd27212910d80": "994665226a1e29df0c1b49fa560f5080",
".git/objects/12/b690480a154e998af3eab575bfd9b0fc58de65": "a2349b9cc2644c0a3b800b04450a4560",
".git/objects/79/6a8c0464e4bb580ba433ea735227ab2782c66b": "653c743baf303262d2bb92ece3fb0658",
".git/objects/2e/575a725742e79c48e00573b48c1a178f333e36": "339a3f22d71afef03d3b76186b7186b0",
".git/objects/20/e3cb9cdc98861709ddd367f9b4d4401b313658": "7575938ae230f490482d00415f0067c2",
".git/objects/25/9f44889878e6877fa4bb8cc5f1ff7621876722": "9aa42e392829aca55f88775f514cfbe7",
".git/objects/7d/6995701d8563ffa8b1d283309cb29f1edfb381": "60727fdbc88ed093599a19dcf325bbb2",
".git/objects/9e/ed02411ff431b5fa558c6ea8ba78403d6b4731": "20108823aa1262c00a4e6b761d6cc67e",
".git/objects/ad/745979ab3b05cab4649c3c6fe302b48a1c9659": "faf97188829a7775f6ac7ba1a26fa7de",
".git/objects/43/52aaddcb97666a13f3e64d469b6939a7a0bf1f": "02b512a945a14bf554d5b5939af41145",
".git/objects/ec/5e5fb19e605a8adbc609ac9af68fe38d1abadc": "cf44210ab82e8aaada7cff819b380f96",
".git/objects/e9/dec401210d3689d4412cd377583e5ed2230654": "0e746924a778df8c9205150a464bdc6a",
".git/objects/01/5498f697c3607235cf01a2ee191ed4496b640f": "2cd7d046e2aac5d6aa02218f8c89001c",
".git/objects/b3/1970de4ea0b4d6234c5f16e554961fd3d7de7e": "b82e90528527fbcd2c3aa68f7ba17d9a",
".git/objects/c8/4703705c42276d7a9091b720392fd235b96604": "c8bda711d7ab4fe51db0700f893f5c99",
".git/objects/f5/d5cecad4a50b6dae4de8cc0ab84530bef18333": "6472bc6b0ebe030eb857bc257b875a7c",
".git/objects/97/49cd070e5963ffd9015d8d4ca50f9689e67cd3": "96c2fb50a59f396807a5e88a5f7a7026",
".git/objects/95/d8da1733c80baf2e06f5515f0792f86137f56d": "c1dc3d6a7d90b75ea35f7469da30b786",
".git/objects/9a/60e188b77c18d198d593869a24652e53b0516a": "34798970b8ecaaceb415a7e348ff0fc0",
".git/objects/57/3ad6e0edc235ce5828d44ed8e40eed93644a53": "059032c9605df53cd52b059b68325e91",
".git/COMMIT_EDITMSG": "eae18d62e6b6c83bfafada49f12be89f",
".git/logs/HEAD": "99bbe95afe3348d7748334bb7e500fdd",
".git/logs/refs/heads/master": "609d4725ab41d0a702bb87692318779d",
".git/logs/refs/remotes/origin/master": "f16d6c5d9b964c68ccb3b6ac65b010a3",
".git/config": "7c6e6a49c169f50e33e408416057b4f5",
".git/FETCH_HEAD": "b1d38f42e02415101a7f52d865a5b46f",
".git/ORIG_HEAD": "f6007e4f613c27ded56bfc42d1bce2f6",
".git/index": "d78cf542b118424c017e9ff61cd5af2a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
