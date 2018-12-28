
console.log(process.env);
console.log('No value for vidly mail password yet:', process.env.VIDLY_MailPassword);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

console.log('Now the value for FOO is:', process.env.FOO);
  