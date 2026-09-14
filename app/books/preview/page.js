import Link from 'next/link';
import { Pic, SectionHead, Break, Prov, Signup } from '../../../components/Blocks';
import site from '../../../data/site.json';

export const metadata = { title: 'The Umbra Circle · Preview' };

export default function Preview() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 'clamp(48px,7vw,88px)' }}>
        <div className="crumb"><Link href="/books">Books</Link> &nbsp;/&nbsp; <b>The Umbra Circle</b></div>
        <h1 className="ep-title">The Umbra <span>Circle</span></h1>
        <p className="ep-sub">Illicit Shadows Chronicles, Book One. By Sam Rad and David M. Luna.</p>
      </section>

      <section className="wrap reveal tight">
        <div className="preview-top">
          <Pic base="/images/book-umbra-circle" alt="The Umbra Circle, Book One" className="book3d" priority />
          <div>
            <p className="eyebrow">Logline</p>
            <p className="logline">Two investigative founders build the world&rsquo;s first museum of crime
              convergence. When a diplomat is assassinated in London, they are drawn into a web of
              espionage and uncover The Umbra Circle: a network of politicians, financiers, and
              organized-crime groups manipulating world systems for power and profit.</p>
            <p className="meta">COMING LATE 2026 &middot; WASHINGTON, D.C. &middot; LONDON &middot; ROME &middot; MEXICO CITY</p>
          </div>
        </div>
      </section>

      <Break base="/images/break-evidence-2" />

      <section className="wrap reveal">
        <SectionHead label="First pages" meta="CHAPTER ONE" />
        {/* Honest placeholder, matching the Signup pattern: nothing invented, and the gap is
            visible rather than filled with lorem or with text the authors did not write. */}
        <div className="pagesbox">
          <Prov status="investigating">Extract pending</Prov>
          <p>The opening pages go here, set as book pages rather than web copy. Supply the extract
            and it drops straight in.</p>
        </div>
      </section>

      <section className="wrap reveal">
        <div className="donor">
          <p className="eyebrow" style={{ textAlign: 'center' }}>Be first to read it</p>
          <h3 className="disp" style={{ textAlign: 'center', margin: '10px 0 14px' }}>Get the <span className="y">next chapter</span></h3>
          <p style={{ textAlign: 'center', color: 'var(--text-2)', maxWidth: '60ch', margin: '0 auto 18px' }}>
            Chapters, release news, and the investigations behind the fiction.</p>
          <Signup endpoint={site.forms?.signup} center />
        </div>
      </section>
    </>
  );
}
