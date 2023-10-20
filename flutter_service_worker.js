'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {".git/hooks/applypatch-msg.sample": "4e33b997d7d5d5274c56bbf61f0c0bf9",
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
".git/refs/heads/master": "cecaf69be7763eb1901f62fb6675c0d2",
".git/refs/remotes/origin/HEAD": "73a00957034783b7b5c8294c54cd3e12",
".git/refs/remotes/origin/master": "cecaf69be7763eb1901f62fb6675c0d2",
".git/objects/pack/pack-d0d50826dccde51189ee9c41e71310e006bce40b.pack": "56ad77c8b593becbc5050ce08fb0afc1",
".git/objects/pack/pack-d0d50826dccde51189ee9c41e71310e006bce40b.rev": "a611e4eaf61f9674cb266de392ddc1bf",
".git/objects/pack/pack-d0d50826dccde51189ee9c41e71310e006bce40b.idx": "2641ddb96997e302d36cf075750fbfa1",
".git/objects/f8/eb9eb1f44ae3813fa4c43e5af00c34e60803e5": "492b0a950feb48229dc3bd00def44d4d",
".git/objects/78/6952321ba059cfec4a58da2c35db30f880530b": "1169e8ab71a47d8a641a1f5ddd554b86",
".git/objects/81/d29458d7e26d6a82b0fa57b9d2772df6f6b9a1": "1c11f14096c60751c32864aceba57dc7",
".git/objects/0c/ef9886e55c8f966343a3974dbb653941f2b0f6": "fae4191806f360097a777dadf01b92d3",
".git/objects/98/fbef69a43b26877ad528d6f7c004767aaeafa7": "d239f076ad10f4bf15fc4e5936327119",
".git/objects/4c/44ff7c96c52443319420a5afbf247fa2767677": "e9617ca45ca19c889a1590f8493bf356",
".git/objects/76/f4e6600607f01c4d61fa06ab601d02c9aad196": "19fdf4cfe27f6ea9a299483812522135",
".git/objects/18/6afde39b9d6b03890b13d1222aef14b417cdeb": "4c7d067331811949857cec2adc3bc108",
".git/objects/08/183a66aa462d773da992331a06af0a1cd31c5a": "0deaef0433c5fb5f5f99c081b8d278bf",
".git/objects/08/c81c8646b123fd8056db01eec01f169c74ae1b": "58f02f658345ef0841543b119718318b",
".git/objects/08/b9656da3aa80e0926c6bbeffdefbd3b5c94d6a": "ae8b387bb95f56411c59d93ec22b59b5",
".git/objects/6c/e0e2d8708550aa36e9914b0f2721e3e412149e": "96e96ee2eb3bdc7c4e0a015af8e2230c",
".git/objects/48/5ba1f389b671779a5780be1c52cdfc296de5a7": "fa71d8d3123a3225375597063a040fb3",
".git/objects/91/0365d18498aa8a03caaedc2da12cd7ad4844f5": "5de02d3bc2a07f4d69012358cbcc320e",
".git/objects/23/8a35fabaccf551769e79977c216158926eb45a": "c33799accb56c050ac0fa52d5a009a83",
".git/objects/87/57eeb80770d768b04b7ca05247c78f164dbd4f": "a3225b34a4ae7e38d61d35ca61ca8fc3",
".git/objects/73/ca377121215675140f639eb825d8a57427fbba": "4b077ae60a6daaebbf4741870a6265cf",
".git/objects/5b/671c1e468d2e3a9deebddbbff1fd3934bc2e97": "a99a245cc035b8d28b3ee07e0738429c",
".git/objects/46/794808e97a0c33c4983161a5e537d2a9e72342": "932dfe03f546b218ad59e5d5691f3c01",
".git/objects/9c/cb60d22573fa7011d1165b3dce4e4e9d98d49c": "889ca475c3ad56c75c0e868600a71415",
".git/objects/35/c3424fc3a210192d4f9e2c66b386ead485bab9": "3bce312f3b4423edfd431f8f21f43069",
".git/objects/5d/0587960c66e34a56f56b8a422d5e8f61135ae6": "86bc7a312b25880a0dcba799763fef64",
".git/objects/34/cbc66471e176a3d2867ab67fe3af1112c63101": "8d67630c400dd1edef9cc33d5cc15997",
".git/objects/a0/727a3f97556c00d9f95fdb4c5c905825694eac": "55dada5ec0fa5d68b3faf2dd7524a7de",
".git/objects/53/02c1e04a841956c69b3b95d65e78f040fd4d65": "f3329a6b2beb2941cc5c79a1c7bafb86",
".git/objects/fc/a5afcec793f8f271b93a5706926c8ade8fa42a": "df3ccfceec4a84ee2cb7e9ca8ba1c6a4",
".git/objects/05/25b856bac8485defba9b6fc0c6e71f15851f5e": "93ed4c2603da2a78337538df21fc9370",
".git/objects/7a/6065ca2c8a0bf871d2c5d25613eada84587dde": "5527ec9705f07621357f14e95a4d6cf9",
".git/objects/d4/7e48310e698ac7282aa15c2a21f21c57518097": "212809e7f6f3802bb26cbd1df102874d",
".git/objects/dc/2c011e800c4e5bc324add9039bee960e36f39f": "de38aca043bb081cd5724aca3c2f136d",
".git/objects/3c/94f142b97d5cca22308b04b529b3871c32593e": "cd85b54169768732a137572a574e50de",
".git/objects/2d/35cfea0da2a9d4b106a6677748e7b626674302": "784c1b6152a50ca627eabaabab36334b",
".git/objects/2d/f6b8ee15dacd950883c0606ae9c2e0476b356b": "ed46413519a5a493e58dacf062cf801b",
".git/objects/96/b041d6583b635f3b9dd38ac8331e23c5ebe6cd": "7aeba3b5d9a893fffad55ece9cc28d22",
".git/objects/c9/abde3da7138088069983c92f8300a7d366021d": "0d5fd3dcd2f0cdbd3fef5450f28577df",
".git/objects/c9/ec5fb3db4878d7e2856f7bee7b68dc02dacb6b": "4a726a926d81144efec07f8134c0c4e3",
".git/objects/65/19ada0b1992e128bf1aeac2f1aa049747006b3": "4c170d8a12d1380d361fd0881f40192d",
".git/objects/cf/3b72493123e6f09a8864fe71e53664f51944c2": "fa7dbf4ea436dad748bb88569500581a",
".git/objects/33/ac2781eba3cfcece1217aa5c4f3df4a3093fe4": "af046a0caf2feb1334ee5e6822a2bd81",
".git/objects/94/458d16d4096f3959e12f45f23f472621ae25e5": "b19bf1be4caf409efc3e2d9aa0f33d0e",
".git/objects/fe/7dedce00995fd221d6a513e3336b7719c3726c": "4c44e5925a324ce1309fc7900d86beb0",
".git/objects/57/868a72a183cd35c35b9cfc723f95554c2e7283": "5a3e7a496a12546bb0e7926e82856d2a",
".git/objects/2c/e7fd7fe39ed553642bd452d540936493e69226": "e0313b6ab1da852e41010b6e787748c6",
".git/objects/aa/ae117ba974e80080d74f867be26d39724a1421": "98dccab3259dbd01acbdf450f6b8a6e9",
".git/objects/36/a34ee497b68c1d39746f1cdc42ea540e5edc6b": "5af8ce8c916653d715dc01c1601a1cb8",
".git/objects/62/aaec6555559a637697c70a3b8a57f299a12830": "23c18f00848cd3e7245151e4b18d865c",
".git/objects/ba/c26e9ccd7c359b4837ae64d9212c303180cc31": "768faf71605d73868cb559c86faa7bdf",
".git/objects/c2/875fe795f38b8514fbe27d017a2ec021adfc23": "b4ac364578fd84be907c6b89623e22a7",
".git/objects/ab/f1b680d334b936a33446fb8e77396531a82549": "9ea5659a232ca691e9369e703777a76a",
".git/objects/b6/a54223555340e816654001f1a3bd61c9685f76": "3accf861375fd2e3479b754a3fc1058b",
".git/packed-refs": "759ec9bf55ae81ee165542e5f2b8856b",
".git/logs/refs/remotes/origin/HEAD": "222d3bc16038de41e0cb4bd0e4511091",
".git/logs/refs/remotes/origin/master": "8de32f6fe7dead6677d39d3a4a4651b0",
".git/logs/refs/heads/master": "68a09ac5da41407783b1b2ef50160c44",
".git/logs/HEAD": "c325f4d7491d5a9aacc5f0d67de789d9",
".git/HEAD": "4cf2d64e44205fe628ddd534e1151b58",
".git/config": "c4d6e03126ce3abfa9b0bc4cabaea4ac",
".git/COMMIT_EDITMSG": "91e5b82f624d32ad77aee81d37f8514c",
".git/ORIG_HEAD": "5505977a72581f8cd22ff7edf6823c0a",
".git/index": "58ec9a93504f1598b0a3834689c7f548",
"assets/AssetManifest.bin": "26f6904ac93183090d879782fafbef19",
"assets/AssetManifest.json": "dbaf316af0f364084ba486918393f149",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/NOTICES": "433302ef56e9b52ee0e55cef7d914bc4",
"assets/assets/icons/home.svg": "2b54bd79eb62c757df2b392cd363492e",
"assets/assets/icons/login.svg": "9c01c2458f062754f2067a435969e916",
"assets/assets/images/bakso.jpg": "32bcfd0f9560c9a44829ba8ddf3f5161",
"assets/assets/images/mie_goreng.jpg": "e03ed1c9375b7b087269c2c2c2627f79",
"assets/assets/images/nasi_goreng.jpg": "51fe886bd0eef7e085d008d84cdc9063",
"assets/assets/images/soto_ayam.jpg": "0b00b316ad257ed3e6d2c305625101cf",
"assets/assets/images/sushi.jpg": "c867d113b4021a4697775267bd27e81c",
"assets/fonts/MaterialIcons-Regular.otf": "3c30d4a16ef15a3dd806fc43d6cb8473",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "19d8b35640d13140fe4e6f3b8d450f04",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "1165572f59d51e963a5bf9bdda61e39b",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "d7b8191f88ec728a1d4387baf5f92ee3",
"/": "d7b8191f88ec728a1d4387baf5f92ee3",
"main.dart.js": "ca6bd72a064cfbec8a636d6d92d746da",
"manifest.json": "a71982e03e84ae5e29ec3291ab83cc93",
"version.json": "575365fdce6a8a54d85286146b86ac28"};
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
