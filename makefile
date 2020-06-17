all: png_icons firefox_extension

png_icons: icons/elf.svg
	convert $< -fuzz 10% -transparent white -geometry 128x128 icons/png/elf128.png
	convert $< -fuzz 10% -transparent white -geometry 16x16 icons/png/elf16.png
	convert $< -fuzz 10% -transparent white -geometry 19x19 icons/png/elf19.png
	convert $< -fuzz 10% -transparent white -geometry 38x38 icons/png/elf38.png
	convert $< -fuzz 10% -transparent white -geometry 48x48 icons/png/elf48.png
	convert $< -fuzz 10% -transparent white -geometry 512x512 icons/png/elf512.png
	convert $< -fuzz 10% -transparent white -geometry 96x96 icons/png/elf96.png

firefox_extension:
	web-ext build

.PHONY: clean

clean:
	rm -rf web-ext-artifacts
