module.exports = {
  extends: ["@repo/eslint-config/next.js"],

  rules: {
    "no-restricted-imports": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-restricted-imports": [
      "warn",
      {
        name: "react-redux",
        importNames: ["useSelector", "useDispatch"],
        message:
          "Use typed hooks `useAppDispatch` and `useAppSelector` instead.",
      },
    ],
  },
};
