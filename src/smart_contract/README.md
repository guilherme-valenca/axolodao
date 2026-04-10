# Smart Contract Setup

This project uses Foundry.

## Install dependencies

Rehydrate the local libraries after cloning or after clearing `smart_contract/lib`:

```bash
cd smart_contract
forge install foundry-rs/forge-std@v1.15.0 OpenZeppelin/openzeppelin-contracts@v5.6.0
```

## Generated files

The following paths are local build artifacts and should stay untracked:

- `out/`
- `broadcast/`
- `cache/`

`lib/` is also treated as a local dependency installation directory and should be recreated with `forge install` instead of being committed.
