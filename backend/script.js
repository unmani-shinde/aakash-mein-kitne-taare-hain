import { config } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai"

config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const blockchain_activity = `{
//     "userId": "0x52Ff4798B9E7fCc16Db2A663A174350a3E1C1237",
//     "transactions": [
//         {
//             "type": "transfer_faucet",
//             "amount": "1000000000000000000",
//             "timestamp": "Sun Jul 14 09:15:06 UTC 2024",
//             "hash": "0xd9e54d9e969cb05e8afacd345990eeceb917723edce0f1d51dd59ab1c30189e3"
//         },
//         {
//             "type": "transfer_faucet",
//             "amount": "1000000000000000000",
//             "timestamp": "Sat Jul 20 08:14:18 UTC 2024",
//             "hash": "0x85a3b4eb7a7bda5fddb156d3097e06756b4cdba80e323813921bfd8f13884e1c"
//         },
//         {
//             "type": "transfer_send",
//             "amount": "1000000000000000000",
//             "timestamp": "Sat Jul 20 14:18:30 UTC 2024",
//             "hash": "0x778ebab176263c2e2e39697c4304ce63c7d636cfda566362442e049faacd3f5b"
//         },
//         {
//             "type": "transfer_receive",
//             "amount": "500000000000000000",
//             "timestamp": "Sat Jul 20 14:26:30 UTC 2024",
//             "hash": "0x6a8df069459b250e33d5eb55fcaf3e06226d72afcdf11b71b8407827ef21b106"
//         },
//         {
//             "type": "transfer_send",
//             "amount": "1000000000000000000",
//             "timestamp": "Sat Jul 20 17:18:15 UTC 2024",
//             "hash": "0xc58ef080961f7c8577de71bdaaded3a9cd8f7f86ac5b416f845c98f2761769e1"
//         },
//         {
//             "type": "transfer_receive",
//             "amount": "999370000000000000",
//             "timestamp": "Sat Jul 20 17:54:21 UTC 2024",
//             "hash": "0x4d0b07124c9f718f6adf8ddac221ece54e2b3f72829af34e1291a2955d895ef3"
//         },
//         {
//             "type": "transfer_faucet",
//             "amount": "1000000000000000000",
//             "timestamp": "Sun Aug 04 14:35:51 UTC 2024",
//             "hash": "0xe53a9e7c02e8efb45d73db3e4f948b69b467390171fc9041932fa3443cf11089"
//         },
//         {
//             "type": "transfer_receive",
//             "amount": "300000000000000",
//             "timestamp": "Sun Aug 04 18:23:36 UTC 2024",
//             "hash": "0x1ceae20b90f3e396a95862c10b05fe025b94ecb1426857d4aaa2f245ffaf64d2"
//         }
//     ],
//     "interactions": [
//         {
//             "contract": "0x1446cf26948333b25719cc5c7d096c9cd0886758",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sun Jul 14 09:42:30 UTC 2024",
//             "hash": "0x837c89f0c555687726e441a2604970fe6b502cb2dddf8e13592f7a7f69dab22f"
//         },
//         {
//             "contract": "0x1446cf26948333b25719cc5c7d096c9cd0886758",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sun Jul 14 09:44:03 UTC 2024",
//             "hash": "0xfd1b0e0936de9dbefba04676d278183889bce748c2266062791a2877f0b0c630"
//         },
//         {
//             "contract": "0x8cf2f40047c6dfc8ab5799f24142f76e5a8f14af",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sun Jul 14 12:44:15 UTC 2024",
//             "hash": "0xa0e08018085bb452cca7b8c5664013fff8e49ccecddcba8776aae3e66430d5d5"
//         },
//         {
//             "contract": "0x81204b19dc7b8e3ae91b88aa07095fe6675c5d47",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Sun Jul 14 12:44:51 UTC 2024",
//             "hash": "0xac69c7fe63aee6871a9b41f5c6db2c93d70386354eebb4b719c6cb5a732243f5"
//         },
//         {
//             "contract": "0x8cf2f40047c6dfc8ab5799f24142f76e5a8f14af",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sun Jul 14 13:12:51 UTC 2024",
//             "hash": "0x32b212e079c469ab90c7883e817969ff4b1092af5fe089d6f4afae6ac13745d4"
//         },
//         {
//             "contract": "0xa0304a7dfc55ea2cdc5217ec077c5072fa9f0146",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Sun Jul 14 13:13:09 UTC 2024",
//             "hash": "0x57f98c0ab8b8e327282f6a952ce8127950ab8ddaa7963af52e25a65d12cfd99e"
//         },
//         {
//             "contract": "0x8f0bcdbf340cb80db9fc703ec8b9cf7fc3d7c8cd",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sun Jul 14 14:29:06 UTC 2024",
//             "hash": "0xc58261f94aa782065e89cbd71844ca0303afee1c2ec4ca7ab40b10121d8b30ae"
//         },
//         {
//             "contract": "0x462706e40bc7acd2bf1a59d71c624dcd49b6d951",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Tue Jul 16 15:41:36 UTC 2024",
//             "hash": "0x881777c5882d3d20a388a0c30efae47b78dc7ba248bfce20def277ac5026a108"
//         },
//         {
//             "contract": "0x9c554af355ba2b045744dcf24aa78e6156839fc0",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Tue Jul 16 16:18:42 UTC 2024",
//             "hash": "0x7aa956c331f5273b21da4dd9e8500e8e3d3ca3f621212023c242d3ee53fb32e8"
//         },
//         {
//             "contract": "0xb7fef1058c49ffad843b0f24e0c59999f7ecf0cb",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Tue Jul 16 16:58:36 UTC 2024",
//             "hash": "0x807504affce528a5c921c974362c847b3ad1e8bf3b37968dc69e963bb05dac4b"
//         },
//         {
//             "contract": "0x9d9139a0d097ba55279d60128d2aa65661edefe2",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Tue Jul 16 16:59:42 UTC 2024",
//             "hash": "0xebe68069ab0232213b383f82ccbdc2aa668b5a59f4fa2b81955db1a299dea40b"
//         },
//         {
//             "contract": "0x3577f9a9121bfadfe61a133b9fc909e118351548",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Thu Jul 18 19:58:00 UTC 2024",
//             "hash": "0xf24e40e112bc3abf75e414879c5fbc118ccad4f0640d9a466098ef3ee51c880b"
//         },
//         {
//             "contract": "0x70aacd234c986ef28213b6a5cc5e3308ade40aba",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Fri Jul 19 16:17:36 UTC 2024",
//             "hash": "0x656e018e89b9d071ff2a0a1010f83f57479500220b4525e363482295a890c35d"
//         },
//         {
//             "contract": "0x3b4069edaae101cb4af4a147175dfdbdd494e1c0",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Fri Jul 19 17:06:27 UTC 2024",
//             "hash": "0xbecbcfbb5878f1075327b5601a593d41403da262dba6e5ffae661e4d579dac1f"
//         },
//         {
//             "contract": "0xea07adaa8c1981ae080afee68caf07805439f3c6",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 07:45:18 UTC 2024",
//             "hash": "0xf8ffbc600559a49b890579eb09ff6d4a94f5e8d81a8e37ea1db409d086c23eee"
//         },
//         {
//             "contract": "0x631ab72a48ec747f4b5353bf3b9d21a296f5f273",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 07:46:36 UTC 2024",
//             "hash": "0xc1225430e0cc7a17370311692eec9831ce19f40c970eabce723a82c3ea7fb386"
//         },
//         {
//             "contract": "0x907a6cd1a4ba622d50d7ddb193774f5ac67b2108",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 11:12:30 UTC 2024",
//             "hash": "0xc069e7a98066809013ef55fb39d66c331c7d4293c1637111b900711b64dbddad"
//         },
//         {
//             "contract": "0xd85a810935f6f6b4b1318e47ff2f5577c99901c0",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 11:35:03 UTC 2024",
//             "hash": "0xf6dbf1f9455511a9885cc4af7a4a8f5b39dc0df222e15ac2d3be97d3865e93ea"
//         },
//         {
//             "contract": "0x44bc8c5609ab5bc20de42fd7deed8995cee6c424",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 12:27:45 UTC 2024",
//             "hash": "0x8dc232bbce410a70b8f2090323d14ce4e9a00c255c86dcf04a9aee9fd7d4c9b8"
//         },
//         {
//             "contract": "0x95f917a0ffa2e8a84b5f0abf42ba5491d838470a",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 12:28:30 UTC 2024",
//             "hash": "0x091cef2f010679e6ad164d7b916d4e7961376ae6692bbf4cf5623ee0c60124ef"
//         },
//         {
//             "contract": "0x7a0f5fd92afff6afc4036588831f47b0d863a2c8",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 12:35:39 UTC 2024",
//             "hash": "0xf9123e7c106275746b4192c46882cd7488420d84cf93c48c6f252bc3f4e29eeb"
//         },
//         {
//             "contract": "0x6a88c1cbdd1cb2307a7c56a3c193e5fe320f4cae",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 12:38:12 UTC 2024",
//             "hash": "0x7d10a7d8d7cd020821b28cb9c2591b06ee122d732c676571be4e3fbb782b5deb"
//         },
//         {
//             "contract": "0x6f9360fc1ca4833818fec262fcb3ef204f8357cd",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 12:46:54 UTC 2024",
//             "hash": "0xb765de37d0943f0e179f78c39936bf8a7e34d7f25eeba7f97f276ee00f3f837f"
//         },
//         {
//             "contract": "0x74ebc838e326e6a21886dd70b5325314d02bfb28",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 12:47:30 UTC 2024",
//             "hash": "0xbbd60ee4f3fa196b7313ed4d33b63f00f30a5318a214cc2e0cbb29415a3e0b50"
//         },
//         {
//             "contract": "0x1879649ea80074b15c861059d999fc7ce202bb28",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 13:26:36 UTC 2024",
//             "hash": "0x7800d19d134246a7a52ef5881d64504b6c599906bd3f2924ea4e97fcede2dbea"
//         },
//         {
//             "contract": "0x3a060add35aef3818741909036db84551e95acf0",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 13:27:09 UTC 2024",
//             "hash": "0x02664fb0765b6ae8122248c9013086ae5e3fdf81e1bfcbc1f344b6eac100e5cf"
//         },
//         {
//             "contract": "0x1879649ea80074b15c861059d999fc7ce202bb28",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 13:38:48 UTC 2024",
//             "hash": "0x81c2889a228e1a9cbbe4507cc058825cfa6aedd8a834b355ce803356d3feb0f8"
//         },
//         {
//             "contract": "0x433e7b905933d48e00bff9797e9813d5523edb96",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 13:57:42 UTC 2024",
//             "hash": "0x3fdc9bdcf77234e677a58d024cb5cfd18c2344ed50c726c3d222df47adb22374"
//         },
//         {
//             "contract": "0xce290a14ecb7f439853d7144884e698e59fa26e8",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 14:11:27 UTC 2024",
//             "hash": "0x4ef2f14aa65acd3f7b50ccc2204ccd09b1c57c481c72d660b4f4ee29d504fa5a"
//         },
//         {
//             "contract": "0xd21d7e4d4016746f3fdd0a54310b1532fb511251",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 14:20:18 UTC 2024",
//             "hash": "0x8a6520099d1f84de6fbb46450c31c9d803a16428c46c7933dc119d28371d583e"
//         },
//         {
//             "contract": "0xd21d7e4d4016746f3fdd0a54310b1532fb511251",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 14:57:30 UTC 2024",
//             "hash": "0x46dc004ff72c372cb9163280cee88b2c93946db821d75910e0c1aa36112c66b6"
//         },
//         {
//             "contract": "0xd21d7e4d4016746f3fdd0a54310b1532fb511251",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 15:12:45 UTC 2024",
//             "hash": "0xdf963bc27467dcb556a93bee9a00769c073a5732493f838bb156235f1f2c771d"
//         },
//         {
//             "contract": "0xd21d7e4d4016746f3fdd0a54310b1532fb511251",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 15:19:09 UTC 2024",
//             "hash": "0xfbf12c35a41f4841d98c2074d3d9e13bfc3e5633acfe8d9f590c117516822f11"
//         },
//         {
//             "contract": "0xd21d7e4d4016746f3fdd0a54310b1532fb511251",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 15:23:39 UTC 2024",
//             "hash": "0x4263efcbb53a17d8d64d7c96e672c71ec2d72e5ce004204e45f5cd21c8f49d21"
//         },
//         {
//             "contract": "0xc27e701a60dad3b4bbfc3b626e5db9a0195ce989",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 16:04:54 UTC 2024",
//             "hash": "0x826103570ab6135ac27d56da09b993209eb958862b02dbc81203dc4e434affd7"
//         },
//         {
//             "contract": "0x5e501a07778513ca1a024b19c25701310cff7262",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 16:14:15 UTC 2024",
//             "hash": "0x8eef0c02f2fedc538e066d562657e1b2d67fb6cdb4de068bf20558c621bb8291"
//         },
//         {
//             "contract": "0x15fe4b4eab035a94369f21e191895706ea4e0396",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 16:19:48 UTC 2024",
//             "hash": "0xc600bd17aa024205ab0a8da5fa52eb3d131fafd36f5f21e7a9e1e0e7016761d2"
//         },
//         {
//             "contract": "0xca94bc88bbd0fb5a5891143f3078ce7186954879",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 16:26:42 UTC 2024",
//             "hash": "0xdb3df06af63bc262cea8928861fa3f185c6eed57febb11b46d62045310459502"
//         },
//         {
//             "contract": "0x6e0e492e100081dfa819d679facf81ce01d3a7b5",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 17:14:03 UTC 2024",
//             "hash": "0x9c63adf919b4500929f56c536b1e2b52012aaa75aeb4b5f8b27d874a2df3af11"
//         },
//         {
//             "contract": "0x2b7fbac6ab85d77bd9a1c0c01b11179a7367bcd9",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 17:21:42 UTC 2024",
//             "hash": "0x9db25c9ec072031758b7c2841e2a0143642895f5e1a423708bf4cce481d9dd65"
//         },
//         {
//             "contract": "0x9b685c5546276e19ec4ff52274778543c5761a93",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 17:22:39 UTC 2024",
//             "hash": "0xd0879c7fd6099f4f594cc040e24d1215e0b4efa2a721b8cafe65ce502dc9f205"
//         },
//         {
//             "contract": "0xfb665c017a938c58b7f1883e03d276149b4253ac",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 17:27:51 UTC 2024",
//             "hash": "0x6b1ec34b1c9f03a2791fbb1ad9d698aa5bfd3e847dc9629583a3260c85e70b2e"
//         },
//         {
//             "contract": "0x566c7243aa3e1b8633c5d0dc9f216b253b0d92b3",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 17:28:39 UTC 2024",
//             "hash": "0xf8d6991c7b7cc116103c93d182de65423d282896d94ceebc411c37fb2d24bea1"
//         },
//         {
//             "contract": "0x9726d70b570d36ac643285483c192e715e1fe2e0",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 17:52:51 UTC 2024",
//             "hash": "0xf7ab5fb12aa0c7b0b52566c93f366317c1d1af4c45b4d665ba77b1da22287399"
//         },
//         {
//             "contract": "0x02651dbb8559700866a4b3b5dc4cbf64bb779041",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 17:55:24 UTC 2024",
//             "hash": "0x72b4a6c93f80c3d15f68b9c1b181c2a6de7ac124ae233aae4fc76521a223e16e"
//         },
//         {
//             "contract": "0x9726d70b570d36ac643285483c192e715e1fe2e0",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 18:18:21 UTC 2024",
//             "hash": "0xe211547bee4a5a37341353aae0862a6b94bc77359af81e27b53e8fcab123d224"
//         },
//         {
//             "contract": "0x7e95498e557d4b65c225c9fac25c8dace0a890c4",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 18:24:42 UTC 2024",
//             "hash": "0x8a964ed90b8dd04de2ea0a6551405c0eab27b29b36864acaa9d8a498b85484d2"
//         },
//         {
//             "contract": "0x9726d70b570d36ac643285483c192e715e1fe2e0",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 18:39:57 UTC 2024",
//             "hash": "0xebad43911339d051b334c716643a2cfd45893a6f404d030b33b5c4c5a6d5223e"
//         },
//         {
//             "contract": "0x61189d581cf90f6a46b33d9b5c2b13e6d9ef6c9a",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 18:42:00 UTC 2024",
//             "hash": "0x1f9e95ef39afe949d51a318cbb4128c406a319552b20cc80b9d4f6a15bd1d17b"
//         },
//         {
//             "contract": "0x9726d70b570d36ac643285483c192e715e1fe2e0",
//             "action": "contract_fxn_interaction",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 18:45:48 UTC 2024",
//             "hash": "0x723890a4241ed6253f8c4013899314b9584d07c5b26623167163f92fdce6d9f4"
//         },
//         {
//             "contract": "0x9b0ed55aeef2b2f7c0c33712eaedd7777c860ef8",
//             "action": "deploy_contract",
//             "amount": "0",
//             "timestamp": "Sat Jul 20 18:46:27 UTC 2024",
//             "hash": "0x97f0063e30cf89170a3ee2ef28529f5655d45f4b758ebfd8ab7a19d10cb1f7e2"
//         }
//     ],
//     "recieve_erc20": [
//         {
//             "type": "receive_mint",
//             "timestamp": "Sun Jul 14 12:44:15 UTC 2024",
//             "hash": "0xa0e08018085bb452cca7b8c5664013fff8e49ccecddcba8776aae3e66430d5d5"
//         },
//         {
//             "type": "receive_mint",
//             "timestamp": "Sun Jul 14 13:12:51 UTC 2024",
//             "hash": "0x32b212e079c469ab90c7883e817969ff4b1092af5fe089d6f4afae6ac13745d4"
//         },
//         {
//             "type": "receive_mint",
//             "timestamp": "Sun Jul 14 14:29:06 UTC 2024",
//             "hash": "0xc58261f94aa782065e89cbd71844ca0303afee1c2ec4ca7ab40b10121d8b30ae"
//         }
//     ],
//     "send_erc20": [
//         {
//             "type": "send",
//             "timestamp": "Sun Jul 14 12:44:51 UTC 2024",
//             "hash": "0xac69c7fe63aee6871a9b41f5c6db2c93d70386354eebb4b719c6cb5a732243f5"
//         },
//         {
//             "type": "send",
//             "timestamp": "Sun Jul 14 13:13:09 UTC 2024",
//             "hash": "0x57f98c0ab8b8e327282f6a952ce8127950ab8ddaa7963af52e25a65d12cfd99e"
//         }
//     ]
// }`

// const example_prompt = `### Personalized Horoscope Prediction

// **Astrological Insight for the Coming Days**

// **General Overview:**
// You've been exceptionally active in the blockchain space lately, with a notable pattern of frequent transactions, contract interactions, and deployments. Your recent blockchain activity reveals a mix of strategic financial maneuvers and innovative contract engagements, suggesting a period of dynamic change and opportunity in your life.

// **Finance and Career:**
// Your transactions, particularly the frequent faucet transfers and significant send/receive transactions, indicate a phase of financial adjustment and liquidity management. You might be navigating through a period where you're optimizing your resources, whether it's for personal investments or professional projects. This is a strong time for financial planning and leveraging your resources wisely. Be vigilant with your investments and ensure your actions align with your long-term goals.

// **Personal Growth and Innovation:**
// The high frequency of contract deployments and interactions shows that you're not just participating but actively shaping the blockchain ecosystem. This creative energy is pushing you towards new innovative ventures. It’s a sign that your ideas are in alignment with your personal growth. Embrace the opportunities for collaboration and innovation that come your way. Your proactive approach in developing and interacting with contracts suggests that your efforts are laying the groundwork for significant breakthroughs.

// **Social and Relationship Dynamics:**
// Your recent activities show that you're building and interacting with various blockchain communities and projects. This indicates a period of increased social interaction and networking. Be open to new connections and collaborations. There might be opportunities to form valuable partnerships or alliances that could benefit your personal and professional life. Trust your instincts when it comes to choosing collaborators, as your recent blockchain activity suggests you have a strong sense of who will complement your goals.

// **Advice:**
// Stay grounded and focus on balancing your strategic financial moves with your innovative projects. While your drive and creativity are commendable, remember to take moments to reflect and ensure that your actions align with your core values and long-term objectives. This period is ripe for growth, but it’s also important to keep your vision clear and avoid distractions that might lead you off course.

// **Key Dates:**
// - **July 20:** Pay attention to financial decisions and potential opportunities for innovation.
// - **August 4:** A good time for new social connections and exploring collaborative projects.

// Embrace this dynamic period as a chance to not only advance your blockchain projects but also to grow personally and professionally. Your proactive efforts are setting the stage for exciting developments.`


export async function run(blockchain_activity) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = `Generate a personalized horoscope prediction based on the following blockchain activity. The activity summary is provided to help you understand the context of the user's recent transactions and interactions. ${blockchain_activity}. The prediction should have four aspects, with two sentences for each aspect- General Overview, Finance and Career, Personal Growth and Innovation, Social and Relationship Dynamics.`

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}


