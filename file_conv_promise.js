const fs = require("fs/promises");
const { Buffer } = require("buffer");

const open_files = async (input_fname, output_fname) => {
  fs.open(input_fname, "r").then((in_fh) => {
    fs.open(output_fname, "w").then((out_fh) => {
      convert_file(in_fh, out_fh);
    })
  })
}

const BUFFER_SIZE = 20;
const MAX_READ_SIZE = 16;

const convert_file = async (in_fh, out_fh) => {
  const buf = Buffer.alloc(BUFFER_SIZE);

  // console.log(in_fh, out_fh);

  in_fh.read(buf, 0, MAX_READ_SIZE, null).then(({ bytesRead, buffer }) => {
    console.log("bytesRead:", bytesRead);
    console.log(buffer.toString("utf8", 0, bytesRead));
    if (bytesRead > 0) {
      out_fh.write(buffer.toString("utf8", 0, bytesRead).toUpperCase(), null, "utf8").then(({ bytesWritten, out_buffer }) => {
        convert_file(in_fh, out_fh);
      });
    }
  });
}

const file_conv_promise = (input_fname, output_fname) => {
  try {
    open_files(input_fname, output_fname);
  }
  catch (err) {
    console.error(err.name, err.message);
  }
  finally {
    console.log("Done!!");
  }
}

module.exports = {
  file_conv_promise
};
