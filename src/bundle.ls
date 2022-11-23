csp.manager.prototype.bundle = (libs, scope-test) ->
  libs = if Array.isArray(libs) => libs else [libs]
  hash = {}
  libs
    .map (o) ~> @cache o
    .filter -> it and it.id
    .map -> hash[it.id] = it
  libs = [v for k,v of hash]
  @load libs, scope-test, true .then (libs) -> libs.map(->it.code).join(\\n)
