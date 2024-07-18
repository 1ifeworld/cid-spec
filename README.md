Sketch of serialization, hashing, and encoding functions for use with River data formats

- `src/ipfs.ts` is where to find serialization, hasing, encoding functions
- `src/types.ts` exports draft version of our protocol actions spec for reference

The goal of this repo is to formalize a set of functions that facilitate:
- conversion of small json objects AND large media files into ipfs combatible cids, using blake3 and multicodec
- persistence of those files/cids onto "ipfs mainnet"
- retrieval of those files at their associated cids through public ipfs gateways
