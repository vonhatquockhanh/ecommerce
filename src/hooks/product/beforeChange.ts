import { BeforeChangeHook } from "../../payload/collections/config/types";

const ConvertToSlug = (text: string) => {
    let textReplace = text.trim();
    textReplace = textReplace.replace('-', '');
    textReplace = textReplace.replace('  ', ' ');
    return textReplace
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
  };
  
const removeUnicode = (str: string) => {
str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
str = str.replace(/đ/g, 'd');
str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
str = str.replace(/Đ/g, 'D');
return str;
};

export const generateProductSlug: BeforeChangeHook = async ({ data, req, operation }) => {
  const productName = data.product_name;
  let sanitizedProductName = removeUnicode(productName.trim());
  sanitizedProductName = ConvertToSlug(sanitizedProductName);
  if (operation === 'create' || (operation === 'update' && sanitizedProductName !== data.slug)) {
    const payload = req.payload;
    let newSlug = sanitizedProductName;
    let counter = 1;
  
    while (true) {
      const existingProducts = await payload.find({
        collection: 'product',
        where: { slug: { equals: newSlug } },
      });
  
      if (!existingProducts || existingProducts.docs.length === 0) {
        data.slug = newSlug;
        break;
      }
  
      newSlug = `${sanitizedProductName}-${counter}`;
      counter++;
    }
  }
}
