import { COMMENTS } from "../data";
import XpWindow from "../xp-window";

export default function FriendCommentsPanel() {
  return (
    <XpWindow frame="panel" title="Friend Comments" className="mt-[1em]">
      <div className="p-[7px]">
        <table className="block h-[300px] w-full border-separate border-spacing-[2px] overflow-y-scroll bg-[#e7e4cf] wrap-break-word">
          <tbody>
            {COMMENTS.map((comment) => (
              <tr key={comment.commentHref}>
                <td className="w-[38%] border-r border-b border-r-[#bebbaa] border-b-[#bebbaa] bg-[#f8f6f0] text-center align-top font-bold">
                  <a href={comment.profileHref} className="text-[#1E40AF] no-underline">
                    <p className="m-0 mb-[8px] max-w-full text-[100%]">
                      {comment.author}
                    </p>
                  </a>
                  <a href={comment.profileHref} className="text-[#1E40AF] no-underline">
                    <img
                      src={comment.pfp}
                      alt={comment.alt}
                      loading="lazy"
                      className="inline max-h-[200px] w-[90px] max-w-full align-baseline"
                    />
                  </a>
                </td>
                <td className="bg-white align-top">
                  <p className="m-0 mb-[8px] max-w-full text-[100%]">
                    <b>
                      <a
                        href={comment.commentHref}
                        className="text-inherit no-underline"
                      >
                        <time className="opacity-100">{comment.ago}</time>
                      </a>
                    </b>
                  </p>
                  <p className="m-0 mb-[8px] max-w-full text-[100%]">
                    {comment.body}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </XpWindow>
  );
}
