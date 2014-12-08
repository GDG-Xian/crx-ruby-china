PACK_DIR = package
PACK_FILE = $(PACK_DIR)/ruby-china-chrome.zip

default:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  zip        to pack extension source into $(PACK_FILE)"
cleanup:
	@echo "Removing old package..."
	@rm -rf $(PACK_DIR)
zip:
	@echo "Making new package..."
	@mkdir -p $(PACK_DIR)
	@cd extension && zip -r ../$(PACK_FILE) * 
	@echo "Extension packed to $(PACK_FILE)"
