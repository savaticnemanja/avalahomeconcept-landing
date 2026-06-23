'use client';
import { useState } from 'react';
import Link from 'next/link';
import { LuArrowLeft, LuTrash2, LuSave, LuPlus, LuStar, LuImage } from 'react-icons/lu';
import { imageUrl } from '@/lib/imageUrl';
import { HIGHLIGHT_ICONS, HIGHLIGHT_ICON_LABELS } from '@/lib/admin/constants';
import { LocaleFields } from '@/components/admin/LocaleFields';
import { SitePlanEditor } from '@/components/admin/SitePlanEditor';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { SubmitButton } from '@/components/admin/SubmitButton';
import { Sortable, SortableItem, DragHandle } from '@/components/admin/Sortable';
import {
  updateProject,
  updateProjectPin,
  deleteProject,
  createProjectImage,
  updateProjectImage,
  deleteProjectImage,
  setProjectCover,
  reorderProjectImages,
  createHighlight,
  updateHighlight,
  deleteHighlight,
  reorderHighlights,
  createRoom,
  updateRoom,
  deleteRoom,
  reorderRooms,
} from '@/lib/admin/actions';

const cardClass = 'bg-bg-alt border border-border rounded-[6px]';
const input =
  'w-full bg-bg-alt border border-border rounded-[3px] px-3 py-2 text-sm text-text placeholder-text-muted focus:outline-none focus:border-accent';
const btnAccent =
  'inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-[3px] bg-accent text-white hover:bg-accent-hover transition-colors';
const btnGhost =
  'inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-[3px] border border-border text-text-muted hover:text-text hover:border-accent transition-colors';
const btnDanger =
  'inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-[3px] border border-red-300 text-red-600 hover:bg-red-50 transition-colors';
const label = 'text-xs font-medium uppercase tracking-wide text-text-muted';

const confirmSubmit = (msg) => (e) => {
  if (!confirm(msg)) e.preventDefault();
};

function Section({ title, desc, children, actions }) {
  return (
    <section className={`${cardClass} p-4 md:p-5`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg text-text" style={{ fontFamily: 'var(--font-heading)' }}>
            {title}
          </h2>
          {desc && <p className="text-xs text-text-muted mt-0.5">{desc}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

function ImageCard({ image, isCover }) {
  const [open, setOpen] = useState(false);
  return (
    <SortableItem id={image.id} className={`${cardClass} overflow-hidden ${isCover ? 'ring-2 ring-accent' : ''}`}>
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl(image.filename)} alt="" className="w-full h-28 object-cover" />
        <DragHandle className="absolute top-1.5 left-1.5 bg-white/85 rounded p-1" />
        {isCover && (
          <span className="absolute top-1.5 right-1.5 bg-accent text-white text-[0.6rem] px-1.5 py-0.5 rounded">
            Naslovna
          </span>
        )}
      </div>
      <div className="p-2 flex items-center justify-between gap-1">
        <button type="button" onClick={() => setOpen((v) => !v)} className="text-xs text-text-muted hover:text-accent">
          Opis
        </button>
        <div className="flex items-center gap-1">
          {!isCover && (
            <form action={setProjectCover}>
              <input type="hidden" name="projectId" value={image.projectId} />
              <input type="hidden" name="filename" value={image.filename} />
              <button type="submit" aria-label="Postavi kao naslovnu" className="text-text-muted hover:text-accent p-1">
                <LuStar className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
          <form action={deleteProjectImage} onSubmit={confirmSubmit('Obrisati sliku?')}>
            <input type="hidden" name="id" value={image.id} />
            <button type="submit" aria-label="Obriši" className="text-text-muted hover:text-red-600 p-1">
              <LuTrash2 className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
      {open && (
        <form action={updateProjectImage} className="p-2 pt-0 flex flex-col gap-2">
          <input type="hidden" name="id" value={image.id} />
          <LocaleFields base="caption" values={image} placeholder="Opis…" />
          <SubmitButton className={`${btnAccent} self-end`} pendingText="…">
            <LuSave className="w-3.5 h-3.5" /> Sačuvaj
          </SubmitButton>
        </form>
      )}
    </SortableItem>
  );
}

function HighlightRow({ highlight }) {
  return (
    <SortableItem id={highlight.id} className={`${cardClass} p-2.5`}>
      <div className="flex items-center gap-2">
        <DragHandle />
        <form action={updateHighlight} className="flex-1 min-w-0 flex items-center gap-2">
          <input type="hidden" name="id" value={highlight.id} />
          <select name="icon" defaultValue={highlight.icon} className={`${input} max-w-[9rem]`} aria-label="Ikonica">
            {HIGHLIGHT_ICONS.map((ic) => (
              <option key={ic} value={ic}>{HIGHLIGHT_ICON_LABELS[ic] ?? ic.replace('Lu', '')}</option>
            ))}
          </select>
          <input name="value" defaultValue={highlight.value} placeholder="139 m²" className={`${input} max-w-[6rem]`} />
          <div className="flex-1 min-w-0">
            <LocaleFields base="label" values={highlight} required placeholder="Naziv" />
          </div>
          <SubmitButton className={`${btnAccent} px-2.5`} pendingText="…" aria-label="Sačuvaj">
            <LuSave className="w-3.5 h-3.5" />
          </SubmitButton>
        </form>
        <form action={deleteHighlight} onSubmit={confirmSubmit('Obrisati stavku?')}>
          <input type="hidden" name="id" value={highlight.id} />
          <button type="submit" aria-label="Obriši" className="p-1.5 text-text-muted hover:text-red-600 transition-colors">
            <LuTrash2 className="w-4 h-4" />
          </button>
        </form>
      </div>
    </SortableItem>
  );
}

function RoomRow({ room }) {
  return (
    <SortableItem id={room.id} className={`${cardClass} p-2.5`}>
      <div className="flex items-center gap-2">
        <DragHandle />
        <form action={updateRoom} className="flex-1 min-w-0 flex items-center gap-2">
          <input type="hidden" name="id" value={room.id} />
          <div className="flex-1 min-w-0">
            <LocaleFields base="name" values={room} required placeholder="Prostorija" />
          </div>
          <input name="area" defaultValue={room.area} placeholder="m²" className={`${input} max-w-[6rem]`} />
          <SubmitButton className={`${btnAccent} px-2.5`} pendingText="…" aria-label="Sačuvaj">
            <LuSave className="w-3.5 h-3.5" />
          </SubmitButton>
        </form>
        <form action={deleteRoom} onSubmit={confirmSubmit('Obrisati prostoriju?')}>
          <input type="hidden" name="id" value={room.id} />
          <button type="submit" aria-label="Obriši" className="p-1.5 text-text-muted hover:text-red-600 transition-colors">
            <LuTrash2 className="w-4 h-4" />
          </button>
        </form>
      </div>
    </SortableItem>
  );
}

export function ProjectEditor({ project }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <Link href="/admin/projects" className={btnGhost}>
          <LuArrowLeft className="w-4 h-4" /> Nazad
        </Link>
        <form action={deleteProject} onSubmit={confirmSubmit('Trajno obrisati ovaj projekat?')}>
          <input type="hidden" name="id" value={project.id} />
          <button type="submit" className={btnDanger}>
            <LuTrash2 className="w-3.5 h-3.5" /> Obriši projekat
          </button>
        </form>
      </div>

      <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl text-text">
        {project.titleSr || project.slug}
      </h1>

      {/* basic data + bullets + area  |  images + site plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        <div className="flex flex-col gap-5">
          <Section title="Osnovni podaci">
            <form action={updateProject} className="flex flex-col gap-4">
              <input type="hidden" name="id" value={project.id} />
              <LocaleFields base="title" label="Naslov" values={project} required />
              <LocaleFields base="subtitle" label="Podnaslov" values={project} />
              <LocaleFields base="badge" label="Oznaka (badge)" values={project} />
              <LocaleFields base="description" label="Opis" values={project} multiline />

              <div className="flex flex-col gap-1.5 max-w-[12rem]">
                <span className={label}>Ukupna površina (m²)</span>
                <input name="totalAreaM2" type="number" step="0.01" defaultValue={project.totalAreaM2 ?? ''} placeholder="139" className={input} />
              </div>

              <SubmitButton className={`${btnAccent} self-end`} pendingText="Čuvanje…">
                <LuSave className="w-4 h-4" /> Sačuvaj podatke
              </SubmitButton>
            </form>
          </Section>

          <Section
            title="Izdvojeno (bullets)"
            desc="Npr. neto površina, broj soba, bazen."
            actions={
              <form action={createHighlight}>
                <input type="hidden" name="projectId" value={project.id} />
                <button type="submit" className={btnAccent}>
                  <LuPlus className="w-3.5 h-3.5" /> Dodaj
                </button>
              </form>
            }
          >
            {project.highlights.length === 0 ? (
              <p className="text-sm text-text-muted">Nema izdvojenih stavki.</p>
            ) : (
              <Sortable ids={project.highlights.map((h) => h.id)} onReorder={(ids) => reorderHighlights(ids)}>
                <div className="flex flex-col gap-3">
                  {project.highlights.map((h) => (
                    <HighlightRow key={h.id} highlight={h} />
                  ))}
                </div>
              </Sortable>
            )}
          </Section>

          <Section
            title="Tabela površina"
            desc="Prostorije i njihove kvadrature."
            actions={
              <form action={createRoom}>
                <input type="hidden" name="projectId" value={project.id} />
                <button type="submit" className={btnAccent}>
                  <LuPlus className="w-3.5 h-3.5" /> Dodaj
                </button>
              </form>
            }
          >
            {project.rooms.length === 0 ? (
              <p className="text-sm text-text-muted">Nema prostorija.</p>
            ) : (
              <Sortable ids={project.rooms.map((r) => r.id)} onReorder={(ids) => reorderRooms(ids)}>
                <div className="flex flex-col gap-3">
                  {project.rooms.map((r) => (
                    <RoomRow key={r.id} room={r} />
                  ))}
                </div>
              </Sortable>
            )}
          </Section>
        </div>

          <div className="flex flex-col gap-5">
            <Section
              title="Slike"
              desc="Prva ili obeležena slika je naslovna. Prevucite za redosled."
              actions={
                <ImageUploader
                  onUploaded={(data) =>
                    createProjectImage({ projectId: project.id, ...data, isCover: !project.coverFilename })
                  }
                />
              }
            >
              {project.images.length === 0 ? (
                <p className="text-sm text-text-muted flex items-center gap-2">
                  <LuImage className="w-4 h-4" /> Nema slika. Otpremite prvu.
                </p>
              ) : (
                <Sortable ids={project.images.map((i) => i.id)} onReorder={(ids) => reorderProjectImages(ids)} layout="grid">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {project.images.map((img) => (
                      <ImageCard key={img.id} image={img} isCover={project.coverFilename === img.filename} />
                    ))}
                  </div>
                </Sortable>
              )}
            </Section>

            {/* Site plan pin — beneath images, same column */}
            <Section title="Plan lokacije (pin)" desc="Pozicija pina na planu lokacije (offer stranica).">
              <form action={updateProjectPin} className="flex flex-col gap-4 max-w-md">
                <input type="hidden" name="id" value={project.id} />
                <SitePlanEditor top={project.sitePlanTop} left={project.sitePlanLeft} order={project.order} />
                <SubmitButton className={`${btnAccent} self-end`} pendingText="Čuvanje…">
                  <LuSave className="w-4 h-4" /> Sačuvaj poziciju
                </SubmitButton>
              </form>
            </Section>
          </div>
      </div>
    </div>
  );
}
