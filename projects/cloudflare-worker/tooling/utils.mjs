export function getArgv(propName) {
  return (
    process.argv
      .find((i) => i.includes(`--${propName}`))
      ?.split(/[=]/)
      .pop() || ''
  );
}

export function setupArgv(name, cbs = {}) {
  const value = getArgv(name);
  if (!value) {
    throw new Error(
      cbs?.error ? cbs.error() : (name) => `Param ${name} not given`
    );
  }

  if (cbs?.success) {
    console.log(cbs.success(value));
  }
  return value;
}
