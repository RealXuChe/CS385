import meta_cidr from "@/app/toolbox/cidr-calculator/metadata";
import meta_fp from "@/app/toolbox/ieee754/metadata";
import meta_bintree from "./bintree/metadata";
import meta_func_plot from "./Function_diagram/metadata";
import meta_QR from "@/app/toolbox/QR-Code/metadata";
import meta_uc from "@/app/toolbox/unit-conversion/metadata";
import meta_hc from "@/app/toolbox/HEX/metadata";
import meta_cc from "@/app/toolbox/Color-code/metadata";

const exported_tools = [
  meta_cidr,
  meta_fp,
  meta_bintree,
  meta_func_plot,
  meta_QR,
  meta_uc,
  meta_cc,
  meta_hc,
];

export default exported_tools;
