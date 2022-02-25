import sharp from "sharp";
import QRCode from "qrcode";
import rect from "./rect";
import square from "./square";

const getRefBanner = async (req, res, next) => {
  const shape: string = req.query.shape || "square";
  const refCode: string = req.query.refCode;
  const type: string = req.query.type;

  const QrPngString = await QRCode.toDataURL(
    `https://app.perp.com/?referral=${refCode}`
  );

  const data = {
    refCode,
    QrPngString,
  };

  let template = square;
  if (shape === "rect") {
    template = rect;
  }

  const resultSvg = template(data);

  if (type === "svg") {
    res.set("Content-Type", "text/html");
    res.send(`<html>${resultSvg}</html>`);
  } else {
    const resultPng = await sharp(Buffer.from(resultSvg))
      .toFormat("png")
      .toBuffer();

    res.set("Content-Type", "image/png");
    res.send(resultPng);
  }
};

export default getRefBanner;
