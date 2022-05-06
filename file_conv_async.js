const fs = require("fs/promises");
const { Buffer } = require("buffer");

const open_files = async (input_fname, output_fname) => {
  const in_fh = await fs.open(input_fname, "r");
  const out_fh = await fs.open(output_fname, "w");

  convert_file(in_fh, out_fh);
}

const BUFFER_SIZE = 20;
const MAX_READ_SIZE = 16;

const convert_file = async (in_fh, out_fh) => {
  const buf = Buffer.alloc(BUFFER_SIZE);

  // console.log(in_fh, out_fh);
  const { bytesRead, buffer } =  await in_fh.read(buf, 0, MAX_READ_SIZE, null);
  console.log("bytesRead:", bytesRead);
  console.log(buffer.toString("utf8", 0, bytesRead));
  if (bytesRead > 0) {
    const { bytesWritten, out_buffer } = await out_fh.write(buffer.toString("utf8", 0, bytesRead).toUpperCase(), null, "utf8");
    convert_file(in_fh, out_fh);
  }
}

const file_conv_async = (input_fname, output_fname) => {
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
  file_conv_async
};
