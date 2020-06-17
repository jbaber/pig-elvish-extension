all: png_icons firefox_extension

png_icons: icons/elf.svg icons/png/elf96.png
	convert $< -fuzz 10% -transparent white -geometry 128x128 icons/png/elf128.png
	convert $< -fuzz 10% -transparent white -geometry 16x16 icons/png/elf16.png
	convert $< -fuzz 10% -transparent white -geometry 19x19 icons/png/elf19.png
	convert $< -fuzz 10% -transparent white -geometry 38x38 icons/png/elf38.png
	convert $< -fuzz 10% -transparent white -geometry 48x48 icons/png/elf48.png
	convert $< -fuzz 10% -transparent white -geometry 512x512 icons/png/elf512.png

icons/png/elf96.png: icons/elf.svg
	convert $< -fuzz 10% -transparent white -geometry 96x96 icons/png/elf96.png

# Can't get this to work for now
# .PRECIOUS: chrome_store_icon_bordered.png
# 
# chrome_store_icon_bordered.png: icons/elf.svg
# 	convert $< -border 16x16 -bordercolor red $@
# 
# chrome_store_icon.png: chrome_store_icon_bordered.png
# 	convert $< -fuzz 10% -transparent red $@

firefox_extension:
	web-ext build

# Should just be a copy of chrome_store_icon.png
chrome_extension: icon_128.png
	git archive --format=zip --prefix=pig-elvish-1.1.4/ release-1.1.4 > pig-elvish-1.1.4.zip

.PHONY: clean

clean:
	rm -rf web-ext-artifacts
	rm pig-elvish-1.1.4.zip
