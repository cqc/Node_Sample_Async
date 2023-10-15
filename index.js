const { argv } = require("process");
const { file_conv_callback } = require("./file_conv_callback");
const { file_conv_async } = require("./file_conv_async");
const { file_conv_promise } = require("./file_conv_promise");


// console.log(argv[2], argv[3]);

const input_fname = argv[2];
const output_fname = argv[3];

// file_conv_callback(input_fname, output_fname);
// file_conv_async(input_fname, output_fname);
file_conv_promise(input_fname, output_fname);

// changed in my-local-branch with cqc