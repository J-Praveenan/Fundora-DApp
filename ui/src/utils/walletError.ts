import { showWarningToast, showErrorToast } from "./toast";

export function handleWalletError(error: any) {
  const message =
    error?.info ||
    error?.message ||
    error?.stack ||
    "Something went wrong.";

  if (
    message.includes("Wallet is locked") ||
    message.includes("unlock the wallet")
  ) {
    showWarningToast("Refresh the browser & unlock your wallet first.");
    return;
  }

  if (message.includes("User declined")) {
    showWarningToast("Transaction cancelled by user.");
    return;
  }

  showErrorToast("Something went wrong. Refresh the browser & and try again.");
}