Rem  DO NOT FORGET TO REPLACE --testnet if you are using --dev

geth  --testnet --verbosity "2" attach "//./pipe/geth.ipc" --exec "loadScript('./scripts/send.unlock.js')" console