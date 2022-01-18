const { Client } = require("pg");

const client = new Client(
  "postgres://public_readonly:nearprotocol@testnet.db.explorer.indexer.near.dev/testnet_explorer"
);

const accountID = "abc.testnet"; // change this!
const query = {
  text: "SELECT * FROM action_receipt_actions WHERE receipt_receiver_account_id = $1 OR receipt_predecessor_account_id = $1;",
  values: [accountID],
};

client
  .connect()
  .then(() => {
    client
      .query(query)
      .then((response) => {
        console.log("So good: ", response);
        // do staff

        client.end();
      })
      .catch((err) => {
        console.log(`Exec query error: ${err}`);
      });
  })
  .catch((err) => console.log(`Conn to db err: ${err}`));
