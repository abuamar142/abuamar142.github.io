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
"main.dart.js": "068fddda41c4501d867bac51cc0ef6af",
"version.json": "575365fdce6a8a54d85286146b86ac28",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/fonts/MaterialIcons-Regular.otf": "ca8cf2594b1b31744c8dcd93cda4ba9b",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.json": "daaf3a96ad507a66186fc87176d5cf39",
"assets/AssetManifest.bin": "aa5de8d491752f4f06cda7f6f5d5999a",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/NOTICES": "b302f7425bd7f51c7fa0da217cfb1d21",
"assets/assets/icons/home.svg": "2b54bd79eb62c757df2b392cd363492e",
"assets/assets/images/nasi_goreng.jpg": "51fe886bd0eef7e085d008d84cdc9063",
"assets/assets/images/mie_goreng.jpg": "e03ed1c9375b7b087269c2c2c2627f79",
"assets/assets/images/bakso.jpg": "32bcfd0f9560c9a44829ba8ddf3f5161",
"assets/assets/images/sushi.jpg": "c867d113b4021a4697775267bd27e81c",
"assets/assets/images/soto_ayam.jpg": "0b00b316ad257ed3e6d2c305625101cf",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"manifest.json": "a71982e03e84ae5e29ec3291ab83cc93",
"index.html": "83a3f33b5526a737bd731cf3dccc2fa2",
"/": "83a3f33b5526a737bd731cf3dccc2fa2",
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
".git/refs/heads/master": "69d876ff620d519402b0dfede3a8321f",
".git/refs/remotes/origin/master": "69d876ff620d519402b0dfede3a8321f",
".git/HEAD": "4cf2d64e44205fe628ddd534e1151b58",
".git/objects/4c/2eca5f73033109648a92c9c0056e26a8c23b71": "2fc7cb1b53fa0d879c6e42d5a764ad40",
".git/objects/8f/e7af5a3e840b75b70e59c3ffda1b58e84a5a1c": "e3695ae5742d7e56a9c696f82745288d",
".git/objects/03/eaddffb9c0e55fb7b5f9b378d9134d8d75dd37": "87850ce0a3dd72f458581004b58ac0d6",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/46/a44098f288a09dd11967a2e8eb841ec5d66977": "fb3523a33c68289b2c6b17a770a5d77e",
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
".git/objects/83/375e033b3603490f128af5ada1db8e0698712d": "05063300760555fbea26b7e05e59d562",
".git/objects/db/b38ed8bd014d6fa2b4e2b6a1e2f8adbae2274b": "5753ac358546a7c7c7846ddbce10bedb",
".git/objects/db/236e8f296a8854cba83960e9b1ff09172b3e1a": "450b3f8e643f91d928e55e19790d9b99",
".git/objects/d5/b54bd4a898b373f82bb1fa52b9580e7a976e3e": "943e27e1d359e2bc22daf20c70287c19",
".git/objects/e0/49c81f7cb35ebc411a3e1b547bf4ccf91292e8": "efad70dc0ca77a90ee53b5cc3be528ca",
".git/objects/fc/de1bb3df8c330568f07ef326d43d8ae3562897": "6e5bf2450330342c243afc3723b9c27e",
".git/objects/fc/40a63ee9cd85342ed1a449c4a79b1413a05c60": "ffe6508d359704dbe82a2168adde10a1",
".git/objects/d3/efa7fd80d9d345a1ad0aaa2e690c38f65f4d4e": "610858a6464fa97567f7cce3b11d9508",
".git/objects/d3/5528e95f0f0d9a3f3196cc44c0d9d427e5805e": "8db8075d2e1df5a1d6488bf8a6aac48f",
".git/objects/d1/7e96979f4fe625c23ef522ca6d43f063a2aaea": "5027013645644f83d75851b824427ed6",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/b7/f63fa336c2eafe554063c8d826b8bcbc37a612": "a98911c5d0f9cd416337b8289a6c5933",
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
".git/objects/df/660d0c6b0841d69df44b024dad2c16cbf068ee": "0392d62473c1f47453c8e5cacd960a72",
".git/objects/bb/ac29f5ef7a40bf14c0901bc1457724156bc0de": "1393f20f0610cabefe2d4f45865b0f54",
".git/objects/cd/0545577105cab2694feef68042088c9b1f2b8b": "7210d91837f6eba19e697d558709bf94",
".git/objects/38/d56fb31a94ca358913c3705ba18fd4721ce856": "20aaf9c39ed5735443edc7203afca5e4",
".git/objects/78/42ccc429704556b0088f105115b705d38f2663": "28450f74e2938c7d8b87147ab659e640",
".git/objects/78/2bcd89d8013f0c977e291512a63cbbc809fc24": "36449c221d8007b1c39bce809bc66e4d",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/68/7f989d6f3b43a57fc0c9b8060175926365e66d": "934dcc754c1dc861040aa6e332e6bf29",
".git/objects/b6/6e292849dc1000f02657ddb693061e5467d696": "a96955f2c1f90626e2e1a93437710bd9",
".git/objects/22/ff1b285d2d5a8ce9b35eab48c028e930acf29f": "2e6fb2bd971a4be22f636f6909580a0e",
".git/objects/12/b4d77f44b6fe329d4436d9679bd27212910d80": "994665226a1e29df0c1b49fa560f5080",
".git/objects/12/b690480a154e998af3eab575bfd9b0fc58de65": "a2349b9cc2644c0a3b800b04450a4560",
".git/objects/12/3e43433ce155138f85bb1abba51cc5472b57f1": "d2d776e52210b2b21ebd2708ee83577b",
".git/objects/79/6a8c0464e4bb580ba433ea735227ab2782c66b": "653c743baf303262d2bb92ece3fb0658",
".git/objects/2e/575a725742e79c48e00573b48c1a178f333e36": "339a3f22d71afef03d3b76186b7186b0",
".git/objects/20/e3cb9cdc98861709ddd367f9b4d4401b313658": "7575938ae230f490482d00415f0067c2",
".git/objects/25/9f44889878e6877fa4bb8cc5f1ff7621876722": "9aa42e392829aca55f88775f514cfbe7",
".git/objects/7d/6995701d8563ffa8b1d283309cb29f1edfb381": "60727fdbc88ed093599a19dcf325bbb2",
".git/objects/7d/67536f79e2d090210dd95f2115ebe59c71c7f9": "06b953ffcdd1b303b8a243d74d4783b8",
".git/objects/9e/ed02411ff431b5fa558c6ea8ba78403d6b4731": "20108823aa1262c00a4e6b761d6cc67e",
".git/objects/9e/5b60c2351731aa96b379e10f11a04d6f9cadec": "440195885c5c4358ed08a26f04c22d03",
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
".git/objects/de/90712924d96a4e3077e080d920e822c5ab6cb5": "e6b40f35053967e8ecba62b827f61c5f",
".git/objects/de/919e218c1180df5ed1ed0699e6850479f010e7": "383000e5d51099e269ad69c61535aac4",
".git/objects/59/25c5b78cefa317602bbff7cc1d8092035f335f": "a41e5bacd8acf8bb057241c1a8485c67",
".git/objects/f4/9bbc06af75ea2067afd9f63156572b5154048d": "35905ab8c6d622377c71dcb9fc627c87",
".git/objects/0c/465e7cf6d35a45490fdb3df2d276cb8c77f66f": "7448ec3b964824973359c1a924e1992f",
".git/objects/4d/37ef1c9ed8d6c75b3a9223ef03e0c9e388bf9f": "81e6c4a1fbd321af49d16606af309b36",
".git/objects/48/c16753178282047c9abb5b56843e6e9e5399c7": "7f8c948b315c6ee15934a4e3f2268e24",
".git/objects/7b/09a94146f5c995135afe710d2eca02bd06365c": "f94694ac9ca6ea9e4382944df480aaf3",
".git/objects/8b/12135ae64010964987b2db4eacc0888782fe5d": "9b2ffb83902480049a63abbb5de9ca29",
".git/objects/34/f33eac12bcf06c70a4ed0130764f2801bfa4d8": "2487fdbda0d6fe74f2dd70a2822276d5",
".git/objects/bd/14ab389f781e8bb1d64a874ab064d6c32d997e": "e68f5381806e627dcb2682137575d0d2",
".git/objects/bd/cf319f38ed5e97c81d9d8498d1cac684bc94dc": "e90c1eb72d9333323f1c624dd63dc312",
".git/objects/ab/fe5de7bfd81df87f567cc8f94b8453ce5ed5f5": "6feb566d2f1841f4909f3c4d8d2064b5",
".git/objects/5f/3564bcd76611dc71875b80a6cd414e1d36acbb": "20a945bbd2115deef784055b3747ee6e",
".git/objects/f6/d7e26e6b83922345b98843f5f3f8c66ec8a88d": "9d2842901954ae2c680dbd0aa01151e6",
".git/objects/6c/c81758da47ecc8ea440198c17f38edd23f9b54": "b84efe30c98dd7704219162828f12f95",
".git/objects/b8/4f6d42172dad23805225364c74b683119ab9d8": "54aeda3d5a7913636836b40aeaed3b01",
".git/objects/5e/ec5c95584fe153e5c5f48cf691a862334342e3": "6d3168b0b7fb955e004537fe7eaac1e3",
".git/objects/56/661c86053f53441affb842ee7d88ee011a4164": "3f999402596defa886b6139b751e86f4",
".git/objects/1b/301dfc76865d47ad056e400ea329d73b916d3a": "608c8d233ed716fc0f0e9a40a92e1ef4",
".git/objects/1b/a953d27373f840d70b1be3ea37268c460e8c8e": "5735898122582177b5471774c2f6ab90",
".git/objects/c7/9cac280f8c64bf7790431c779d7ba1b83163c5": "8aca407f273a00be0b3586e360b67428",
".git/objects/50/101c2d8e85dace0484ab93491b9220dc4c2b87": "7f14e1099169a4d7a2b6cb10f92c6ecc",
".git/objects/30/8c11638e59e80b1b0b302a7f0267feb411310a": "39b02367c89c9a1ea17a4be3d937d1ca",
".git/objects/0f/7dde6f8d68b6238bc3f6f0ba621c76644e57f8": "0a02fbef7fe8414196176e58ca093d47",
".git/objects/32/f9a1d36bf3a9e907233e94a9d223c0579535b2": "8485f14673f75f8cab6212a6269022fd",
".git/objects/a5/a5d298a24091b2d823640368b492c688393f04": "85bfd5eb0a0a1abf0f5568b238dfd997",
".git/objects/f1/a0381fa9dd6dc86cd5c97bffb9f1c4ce87714f": "b6b0d8e4c4c5ca5ed7721044da42423b",
".git/objects/52/969e46f0718556cd8f12e2dcbee2e1475c7024": "3cb3af0c2a0aca41535a1f6d7520f746",
".git/objects/b5/4d1457c84cc3032981db7cdb3d3f892dc41680": "12beb6d0a6d7657866d2e3b08eac4de5",
".git/objects/69/3a6f6a6115f3100c6063742c719ef89328ca4c": "f74857b090e37342bdcef590d5bfd44d",
".git/objects/5c/c2afff219752f32537dccaa9aa603ad1a1608e": "0211003ea9ef64b267f0bfe6ed0f078f",
".git/COMMIT_EDITMSG": "b3bc47de7a8375680ba3272baaa5bc12",
".git/logs/HEAD": "9c2cc30016718d710fb535bd94c6f40d",
".git/logs/refs/heads/master": "6f7f45c4061ab42a0e5415cc1f00db86",
".git/logs/refs/remotes/origin/master": "b52800ce27890af5bd08a41132ca0698",
".git/config": "7c6e6a49c169f50e33e408416057b4f5",
".git/FETCH_HEAD": "2781cffde7fa4e1c8416e7000ba2b477",
".git/ORIG_HEAD": "f6007e4f613c27ded56bfc42d1bce2f6",
".git/index": "074ebf717019771fc979155130aea6c2"};
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
