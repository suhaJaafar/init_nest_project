/**
 * Creates a link to the given URL with the given text.
 * @param {string} to URL to link to
 * @param {string} text text to display in the link
 * @return {HTMLAnchorElement}
 */
function makeLink(to, text) {
  const link = document.createElement('a');
  link.setAttribute('href', to);
  link.target = '_blank';
  link.innerText = text;
  return link;
}

function injectSchemaURLs() {
  const infoSection = document.querySelector('.information-container .info');

  const linkWrapper = document.createElement('div');
  linkWrapper.classList.add('schema-links');
  infoSection.appendChild(linkWrapper);

  const linkToJsonSchema = makeLink(
    '/swagger/api-docs.json',
    'OpenAPI JSON Schema',
  );
  linkWrapper.appendChild(linkToJsonSchema);

  const linkToYamlSchema = makeLink(
    '/swagger/api-docs.yaml',
    'OpenAPI YAML Schema',
  );
  linkWrapper.appendChild(linkToYamlSchema);
}

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(injectSchemaURLs, 500);
});
