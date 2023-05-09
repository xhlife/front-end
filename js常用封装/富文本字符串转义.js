function formatHtml(text) {
  
  const reg = /<[\/]?(pre)/g;
  const tmp = text.replace(reg, function (m, m1) {
    return m.replace("pre", "div");
  });
  return this.escape2Html(tmp);
}
// 转意符换成普通字符
function escape2Html(str) {
  var arrEntities = {
    lt: "<",
    gt: ">",
    nbsp: " ",
    amp: "&",
    quot: '"',
   };
   const val = str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
     return arrEntities[t];
   });
   return this.formatRichText(val);
}
// 小程序中， 图片大小设置
function formatRichText(html) {
  let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
    match = match
      .replace(/style="[^"]+"/gi, "")
      .replace(/style='[^']+'/gi, "");
    match = match
      .replace(/width="[^"]+"/gi, "")
      .replace(/width='[^']+'/gi, "");
    match = match
      .replace(/height="[^"]+"/gi, "")
      .replace(/height='[^']+'/gi, "");
    return match;
  });
  newContent = newContent.replace(
     /style="[^"]+"/gi,
     function (match, capture) {
        match = match
          .replace(/width:[^;]+;/gi, "max-width:100%;")
          .replace(/width:[^;]+;/gi, "max-width:100%;");
        return match;
      }
   );
   // newContent = newContent.replace(/<br[^>]*\/>/gi, '');
   newContent = newContent.replace(
      /\<img/gi,
      '<img style="max-width:100%;height:auto;display:block;margin:10px 0;"'
    );
   return newContent;
}
