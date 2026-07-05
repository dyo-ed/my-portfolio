// Allow TypeScript to import .ed files as raw strings.
// webpack's raw-loader (or Asset Modules with type: 'asset/source') handles the actual loading.
declare module "*.ed" {
  const content: string;
  export default content;
}
