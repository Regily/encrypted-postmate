const isConfigurable = (parent, prop) => {
  let descriptor = Object.getOwnPropertyDescriptor(parent, prop);

  return descriptor && descriptor.configurable;
};

const configureProperties = (parent, props) => {
  const propertyDefinition = {
    enumerable: true,
    configurable: false,
    writable: false
  };

  props.forEach((prop) => {
    if (isConfigurable(parent, prop)) {
      propertyDefinition.value = parent[prop];
      try {
        Object.defineProperty(parent, prop, propertyDefinition);
      } catch (e) {
        console.error(e);
      }
    }
  });
};

if (window) {
  if (Object.defineProperty) {
    configureProperties(window, ['crypto', 'msCrypto', 'Math']);
    configureProperties(Math, ['random', 'max', 'min', 'pow', 'floor', 'ceil']);
  }

  if (Object.freeze) {
    if (window.crypto) {
      try {
        Object.freeze(window.crypto);
      } catch (e) {
        console.error(e);
      }
    }

    if (window.msCrypto) {
      try {
        Object.freeze(window.msCrypto);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
