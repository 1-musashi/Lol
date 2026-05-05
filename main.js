// ===============================
//  نظام التنقّل لزر "أكمل"
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // تحديد كل أزرار "أكمل"
  const continueButtons = document.querySelectorAll(".cont-btn");

  // إذا كان هناك زر أو أكثر
  continueButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

      // تأثير الضغط (نفس القائمة)
      btn.classList.add("active");
      setTimeout(() => btn.classList.remove("active"), 200);

      // قراءة الصفحة الهدف
      const link = btn.getAttribute("data-link");

      // الانتقال للصفحة
      if (link) {
        window.location.href = link;
      }
    });

  });

});