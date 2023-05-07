import { ethers } from "ethers";
import config from "../../abi/contract.json";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { daoService } from "services/dao-service";
import { setPower, setPowerVote } from "redux/delegateSlice";
import { useGlobalState } from "store";

type Props = {
  closeDelegate: Function;
};

declare let window: any;

export default function DelegateModel(props: Props) {
  const { closeDelegate } = props;
  const [connectedAccount] = useGlobalState("connectedAccount");

  const handleClose = () => {
    closeDelegate(false);
  };

  // redux
  const voteState = useSelector((state: any) => state.voteState.value);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const addressDelegate = document.querySelector(
      ".in-address"
    ) as HTMLInputElement;
    const res_address = addressDelegate.value;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contracts = new ethers.Contract(
      voteState === 1 ? config.CardMainnet.BscAddress : config.Coin.address,
      voteState === 1 ? config.CardMainnet.abi : config.Coin.abi,
      signer
    );
    await contracts.delegate(res_address);
    const web3 = new Web3(window.ethereum);
    web3.eth
      .subscribe(
        "logs",
        {
          address:
            voteState === 1
              ? config.CardMainnet.BscAddress
              : config.Coin.address,
        },
        (error: any, result: any) => {
          if (error) console.log(error);
          if (!error) console.log(result);
          setTimeout(async () => {
            if (connectedAccount) {
              daoService
                .getPowerVoteAccount(
                  connectedAccount,
                  voteState === 1 ? "card" : "coin"
                )
                .then((resp) => {
                  if (resp.status == 200)
                    dispatch(setPowerVote(resp?.data?.data?.amount));
                })
                .catch((err) => {
                  console.log(err);
                });

              daoService
                .getPower(connectedAccount, voteState === 1 ? "card" : "coin")
                .then((resp) => {
                  dispatch(setPower(resp?.data.data.amount));
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }, 5000);
        }
      )
      .on("data", function (log: any) {})
      .on("changed", function (log: any) {});
    handleClose();
  };

  return (
    <>
      <div className="modal">
        <div className="wrapper-proposal">
          <div className="proposal-child">
            <div className="icon-close" onClick={handleClose}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.32692 6.25041L11.0379 2.53947C11.214 2.36366 11.313 2.12509 11.3133 1.87623C11.3135 1.62738 11.2148 1.38864 11.039 1.21251C10.8632 1.03639 10.6246 0.937328 10.3758 0.937108C10.1269 0.936888 9.8882 1.03553 9.71208 1.21134L6.00114 4.92228L2.2902 1.21134C2.11408 1.03522 1.87521 0.936279 1.62614 0.936279C1.37707 0.936279 1.1382 1.03522 0.962076 1.21134C0.785955 1.38746 0.687012 1.62633 0.687012 1.87541C0.687012 2.12448 0.785955 2.36335 0.962076 2.53947L4.67301 6.25041L0.962076 9.96134C0.785955 10.1375 0.687012 10.3763 0.687012 10.6254C0.687012 10.8745 0.785955 11.1133 0.962076 11.2895C1.1382 11.4656 1.37707 11.5645 1.62614 11.5645C1.87521 11.5645 2.11408 11.4656 2.2902 11.2895L6.00114 7.57853L9.71208 11.2895C9.8882 11.4656 10.1271 11.5645 10.3761 11.5645C10.6252 11.5645 10.8641 11.4656 11.0402 11.2895C11.2163 11.1133 11.3153 10.8745 11.3153 10.6254C11.3153 10.3763 11.2163 10.1375 11.0402 9.96134L7.32692 6.25041Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="proposal-title">
              <span>Delegate</span>
            </div>
            <div className="title">
              <span>Address Delegate</span>
              <svg
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.376 0.839999L5.056 3.72L7.968 2.904L8.224 4.872L5.568 5.064L7.312 7.384L5.536 8.328L4.32 5.88L3.248 8.312L1.408 7.384L3.136 5.064L0.496 4.856L0.8 2.904L3.648 3.72L3.328 0.839999H5.376Z"
                  fill="#FF3225"
                />
              </svg>
            </div>
            <div className="text-input">
              <input
                type="text"
                id="ten-proposal"
                className="in-address"
              ></input>
            </div>
            <div className="button-group">
              <div className="cancel">
                <button onClick={handleClose}>Cancel</button>
              </div>
              <div className="submit">
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
