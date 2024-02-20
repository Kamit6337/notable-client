/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { userInitialState } from "../redux/slice/initialUserDataSlice";
import { Link } from "react-router-dom";
import { Icons } from "../assets/Icons";
import FindingDivScrollHeight from "../lib/FindingDivScrollHeight";

const ShortcutPage = ({ reset }) => {
  const { notebooks, notes } = useSelector(userInitialState);

  const [shortcutNotes, shortcutNotebooks] = useMemo(() => {
    const filterNotebooks = notebooks.filter((notebook) => notebook.shortcut);
    const filterNotes = notes.filter((note) => note.shortcut);
    return [filterNotes, filterNotebooks];
  }, [notebooks, notes]);

  const { ref: notesRef, height: notesHeight } =
    FindingDivScrollHeight(shortcutNotes);
  const { ref: notebooksRef, height: notebooksHeight } =
    FindingDivScrollHeight(shortcutNotebooks);

  return (
    <section className="px-5 w-full  h-full">
      {/* MARK: PART-1 OF HEADER */}
      <div className="w-full flex justify-center pt-10 pb-10">
        <p className="text-xl font-semibold tracking-wide">Shortcuts</p>
      </div>
      {shortcutNotes.length > 0 && (
        <main>
          <p>Notes</p>
          <p className="w-full h-[1px]  bg-black" />
          <div
            ref={notesRef}
            className={`${
              notesHeight >= 200 ? "overflow-y-scroll" : "overflow-y-hidden"
            } py-2`}
            style={{ maxHeight: "200px" }}
          >
            {shortcutNotes.map((note, i) => {
              const { _id, title } = note;

              return (
                <Link key={i} to={`/notes/${_id}`} onClick={reset}>
                  <div className="flex  gap-1 hover:bg-gray-300 p-2">
                    <p className="mt-[3px]">
                      <Icons.notesSolid />
                    </p>
                    <p>{title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>
      )}

      {shortcutNotebooks.length > 0 && (
        <main className="mt-4">
          <p>Notebooks</p>
          <p className="w-full h-[1px]  bg-black" />
          <div
            ref={notebooksRef}
            className={`${
              notebooksHeight >= 200 ? "overflow-y-scroll" : "overflow-y-hidden"
            } py-2`}
            style={{ maxHeight: "200px" }}
          >
            {shortcutNotebooks.map((note, i) => {
              const { _id, title } = note;

              return (
                <Link key={i} to={`/notebooks/${_id}`} onClick={reset}>
                  <div className=" flex  gap-1 hover:bg-gray-300 p-2">
                    <p className="mt-[3px]">
                      <Icons.notebooks />
                    </p>
                    <p className="">{title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>
      )}

      {shortcutNotes.length === 0 && shortcutNotebooks.length === 0 && (
        <div>No Shortcut available</div>
      )}
    </section>
  );
};

export default ShortcutPage;
