const fs = require('fs');

const path = require('path');

const getListFiles = (req, res) => {
    const directoryPath = path.join(__dirname, "../public/");

    var host = req.get('host');
  
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
  
      let fileInfos = [];
  
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: host + "/files/" + file,
        });
      });
  
      res.status(200).send(fileInfos);
    });
  }

  const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = path.join(__dirname, "../public/");
  
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  };

  module.exports = {
    getListFiles, download
  };