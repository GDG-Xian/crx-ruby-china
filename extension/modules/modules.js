var MODULES = {
  hide_deleted_replies: { script: true },
  zen_mode_editor: { script: true, style: true }
};

function file(filename) {
  return fmt('modules/#{1}/#{2}', module_name, filename);
}

function load_module(tab, module_name) {
  var module = MODULES[module_name];
  var module_dir = fmt('modules/#{1}/', module_name);

  if (module.style) {
    var contentstyle = module_dir + 'contentstyle.css';
    chrome.tabs.insertCSS(tab.id, { file: contentstyle });
  }

  if (module.script) {
    var contentscript = module_dir + 'contentscript.js';
    chrome.tabs.executeScript(tab.id, { file: contentscript });
  }

};