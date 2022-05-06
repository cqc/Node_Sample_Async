const fs = require("fs");
const { Buffer } = require("buffer");

const open_files = (input_fname, output_fname) => {
  fs.open(input_fname, "r", (err, in_fd) => {
    if (err) {
      throw(err);
    } else {
      console.log("in callback", in_fd);
      fs.open(output_fname, "w", (err, out_fd) => {
        if (err) {
          console.error(err.name, err.message);
          return;
        } else {
          convert_file(in_fd, out_fd);
        }
      });
    }
  });
}

const BUFFER_SIZE = 20;
const MAX_READ_SIZE = 16;

const convert_file = (in_fd, out_fd) => {
  // console.log("[convert_file]", in_fd, out_fd);

  const buffer = Buffer.alloc(BUFFER_SIZE);
  fs.read(
    in_fd,
    { buffer: buffer, offset: 0, length: MAX_READ_SIZE, position: null },
    (err, bytesRead, buffer) => {
      if (err) {
        throw(err);
      }
      else {
        console.log("bytesRead:", bytesRead);
        console.log(buffer.toString("utf8", 0, bytesRead));
        if (bytesRead > 0) {
          fs.write(
            out_fd, 
            buffer.toString("utf8", 0, bytesRead).toUpperCase(), null, "utf8",
            (err, bytesWritten, buffer) => {
              if (err) {
                throw(err);
              }
            }
          );
          convert_file(in_fd, out_fd);
        }
      }
    }
  );
}

const file_conv_callback = (input_fname, output_fname) => {
  try {
    open_files(input_fname, output_fname);
  } 
  catch(err) {
    console.error(err.name, err.message);
  }
  finally {
    console.log("Done!!");
  }
}

module.exports = {
  file_conv_callback
};
