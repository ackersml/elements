import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: [
      "reference/yatao/clone/**",
      "reference/yatao/inspect-report.*",
    ],
  },
];

export default eslintConfig;
