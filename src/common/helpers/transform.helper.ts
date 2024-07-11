export class TransformHelper {
  public static trim({ value }) {
    return value ? value.trim() : value;
  }

  public static toLowerCase({ value }) {
    return value ? value.trim().toLowerCase() : value;
  }

  public static toUpperCase({ value }) {
    return value ? value.trim().toUpperCase() : value;
  }
}
