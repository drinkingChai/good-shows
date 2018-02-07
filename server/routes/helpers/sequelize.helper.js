const parseSequelize = (sqlOutput) =>
  JSON.parse(JSON.stringify(sqlOutput))

module.exports = {
  parseSequelize 
}