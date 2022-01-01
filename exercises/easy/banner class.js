class Banner {
  constructor(message, width) {
    this.message = message;
    if (width) this.width = width;
  }

  bannerLengthNoBorder() {
    const GAP = 2;
    if (this.hasOwnProperty('width') && this.width > this.message.length + (2 * GAP)){
      return this.width - GAP;
    } else {
      return this.message.length + GAP;
    }
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    let dash = '-'.repeat(this.bannerLengthNoBorder());
    return `*${dash}*`;
  }

  emptyLine() {
    let spaces = ' '.repeat(this.bannerLengthNoBorder());
    return `|${spaces}|`;
  }

  messageLine() {
    let sideSpaces = (this.bannerLengthNoBorder() - this.message.length) / 2;
    if (sideSpaces % 1 === 1) {
      let side = ' '.repeat(sideSpaces);
      return `|${side}${this.message}${side}|`
    } else {
      let sideLeft = ' '.repeat(Math.floor(sideSpaces));
      let sideRight = ' '.repeat(Math.ceil(sideSpaces));
      return `|${sideLeft}${this.message}${sideRight}|`
    }
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.', 47);
banner1.displayBanner();

let banner2 = new Banner('');
banner2.displayBanner();