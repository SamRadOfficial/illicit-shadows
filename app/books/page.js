import Link from 'next/link';
import { Pic, SectionHead, Break } from '../../components/Blocks';
export const metadata = { title: 'Books' };
export default function Books() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 'clamp(48px,7vw,88px)' }}>
        <p className="eyebrow">The publishing arm</p>
        <h1 className="disp" style={{ marginTop: 14 }}>Read the <span className="y">shadows</span></h1>
      </section>
      <section className="wrap reveal tight">
        <SectionHead label="Fiction series" meta="ILLICIT SHADOWS CHRONICLES" />
        <div className="umbra">
          <div style={{ display: 'flex', justifyContent: 'center' }}><Pic base="/images/book-umbra-circle" alt="The Umbra Circle, Book One" className="book3d" priority /></div>
          <div><p className="eyebrow">Book 1</p><h3>The Umbra <span>Circle</span></h3><p>Two investigative founders establish the world's first museum dedicated to unveiling the hidden architecture of global crime convergence, merging education, intelligence, and storytelling from Washington, D.C. to London, Rome, and Mexico City.</p><p>When a diplomat is assassinated in London, they are drawn into a web of espionage and uncover The Umbra Circle, a secret network of politicians, financiers, and organized-crime groups manipulating world systems for power and profit.</p><p className="tag">COMING LATE 2026 &middot; BY SAM RAD AND DAVID M. LUNA</p><div className="cta-row"><a className="btn btn-y" href="/books/preview">Read the preview</a></div></div>
        </div>
      </section>
    </>
  );
}
