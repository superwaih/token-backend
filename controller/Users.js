require("dotenv").config();
const { UnauthenticatedError, BadRequestError } = require("../errors");
const Wallets = require("../model/Wallets");
const { StatusCodes } = require("http-status-codes");
const CSVToJSON = (data, delimiter = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map(v => {
      const values = v.split(delimiter);
      return titles.reduce(
        (obj, title, index) => ((obj[title] = values[index]), obj),
        {}
      );
    });
};


const getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallets.find();

    res.status(201).json(wallets);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'An error occured'});
  }
};

const uploadWallets = async (req, res) => {
  try {

    const body = req.body

    if (!body || !body.body) {
      return res.status(404).json(
        { message: "Invalid CSV data format" },
        { status: 400 }
      );
    }

    const csvData = CSVToJSON(body.body);

    const newWallets = [];
    for (const row of csvData) {
      const wallet = row["Wallet"]?.trim(); // Remove leading/trailing whitespace from wallet name
      const address = row["Address"]?.trim(); // Remove leading/trailing whitespace from address
      // Check if required fields are present
      if (!wallet || !address) {
        console.warn("Skipping row due to missing data:", row);
        continue; // Skip rows with missing data
      }

      // Check if address already exists in the database
      const existingWallet = await Wallets.findOne({ Address: address });
      if (!existingWallet) {
        const newWallet = await new Wallets({
          Wallet: wallet,
          Address: address,
        }).save();
        newWallets.push(newWallet);
      }
    }

    if (newWallets.length > 0) {
      // await Wallets.insertMany(newWallets);
      return res.status(201).json(
        { message: "Data Added Successfully" }
      );
    } else {
      return res.status(201).json(
        { message: "No new wallets to add" }
      );
    }
  } catch (err) {
    console.error(err);
    return res.status(505).json({ message: "Error Met", err });
  }
};

module.exports = {
 
  getAllWallets,
  uploadWallets
};
