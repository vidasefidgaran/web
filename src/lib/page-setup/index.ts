import { Logger } from "../logger";

const logger = Logger.get("page-setup.ts");

export function pageSetup(title: string, description?: string) {
  document.title = `pelake sabz - ${title}`;
  let meta = document.querySelector('meta[name="description"]') as
    | HTMLMetaElement
    | undefined;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.append(meta);
  }

  if (description && description.length > 155) {
    logger.warn(
      `Description is too long: ${description.length} ${description}`
    );
  }
  meta.content = description || "";
}

export function addNoIndexMeta() {
  let meta = document.querySelector('meta[name="robots"]') as
    | HTMLMetaElement
    | undefined;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "robots";
    document.head.append(meta);
  }

  meta.content = "noindex";
  document.head.append(meta);
}

export function removeNoIndexMeta() {
  const metas = document.querySelectorAll("meta[name=robots][content=noindex]");

  metas.forEach((m) => m.parentNode?.removeChild(m));
}
