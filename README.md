The goal of this repo is to formalize a set of functions that facilitate:
1. conversion of JSON objects and large media files into IPFS combatible CIDs 
2. store/pin bytes to “IPFS mainnet” at our determinstically produced CIDs 
3. retrieve bytes from IPFS addressed by those same CIDs via a gateway


(1) Sketch of serialization, hashing, and encoding functions for use with River data formats

- `src/ipfs.ts` is where to find serialization, hasing, encoding functions
- `src/types.ts` exports draft version of our protocol actions spec for reference

(2) Undrafted

(3) Undrafted
