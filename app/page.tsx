import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Eye,
  GitPullRequest,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type VideoItem = {
  label: string;
  note: string;
  src: string;
};

type RobotCaseProps = {
  eyebrow: string;
  title: string;
  summary: string;
  contribution: string;
  prompt: string;
  videos: VideoItem[];
  reportUrl: string;
  wide?: boolean;
};

const robotCases: RobotCaseProps[] = [
  {
    eyebrow: 'Task 341 · RV2V · DROID',
    title: 'Per-joint command–state tracking error',
    summary:
      'A style Reference defines the visual grammar. The Input exposes controller commands; the Target adds measured states, signed J1–J7 and gripper errors, and frame-level severity without altering the robot video.',
    contribution:
      'Aligned physical controller and measured-state timestamps, designed the eight-panel annotation system, and validated a real 90-frame Reference/Input/Target unit.',
    prompt:
      'Preserve the robot RGB and command traces. Add causally aligned measured state, signed command-minus-measurement error, and LOW / ELEVATED / HIGH severity for J1–J7 and the gripper. Use the Reference for style only—never copy its values or motion.',
    videos: [
      { label: 'Reference', note: 'Visual grammar only', src: '/media/task341-reference.mp4' },
      { label: 'Input', note: 'Commands + real robot RGB', src: '/media/task341-input.mp4' },
      { label: 'Target', note: 'Measured state + error', src: '/media/task341-target.mp4' },
    ],
    reportUrl:
      'https://32-193-64-176.sslip.io/2026-08-26_task-341-robot-command-state-tracking-error-visualization-dataset-report',
    wide: true,
  },
  {
    eyebrow: 'Task 227 · TV2V · Isaac Sim',
    title: 'Industrial robot safety correction',
    summary:
      'The unsafe Input enters a worker exclusion zone. The Target begins from the same scene, camera, robot, and initial state, then reaches the same goal through a safe trajectory.',
    contribution:
      'Built a deterministic Isaac Sim generator with collision geometry, clearance gates, matched initial state, and a visible safe/unsafe policy difference.',
    prompt:
      'Correct the industrial robot’s unsafe motion. Starting from the same robot, scene, camera, and initial state, generate the complete safe operation that reaches the same goal without entering the worker exclusion zone.',
    videos: [
      { label: 'Input', note: '83 zone-violation frames', src: '/media/task227-input.mp4' },
      { label: 'Target', note: '0 zone-violation frames', src: '/media/task227-target.mp4' },
    ],
    reportUrl:
      'https://32-193-64-176.sslip.io/2026-08-06_task-227-v3-video-preview',
  },
  {
    eyebrow: 'Task 259 · TV2V · Isaac Sim',
    title: 'Active re-observation after self-occlusion',
    summary:
      'The Input stops when the gripper blocks its own wrist camera. The Target moves to a bounded observation pose, reacquires the fiducial, returns overhead, grasps, and lifts.',
    contribution:
      'Designed eight factory variants and scene-specific recovery strategies with visibility-ray, attachment, neighbor-clearance, and no-penetration checks.',
    prompt:
      'When the gripper occludes the target fiducial, stop safely, move to a collision-free re-observation pose until it is visible, then return overhead, grasp the tote without contacting neighboring objects, and lift it.',
    videos: [
      { label: 'Input', note: 'Occluded safe stop', src: '/media/task259-input.mp4' },
      { label: 'Target', note: 'Re-observe, grasp, lift', src: '/media/task259-target.mp4' },
    ],
    reportUrl:
      'https://32-193-64-176.sslip.io/2026-08-09_task-259-active-reobservation-dataset-report',
  },
  {
    eyebrow: 'Task 274 · TV2V · Isaac Sim',
    title: 'Mobile manipulator base repositioning',
    summary:
      'A locked-base robot cannot reach the box in the Input. In the Target, the same robot first repositions its base, then extends, closes the gripper, and lifts the same object.',
    contribution:
      'Created paired reachability evidence that separates a genuinely unreachable input from a solver failure, while preserving the camera, target, and initial object state.',
    prompt:
      'Move the mobile base to a reachable, collision-free stance, then pick up the target box. Keep the robot, warehouse, camera, target identity, and initial object state unchanged.',
    videos: [
      { label: 'Input', note: 'Locked base · unreachable', src: '/media/task274-input.mp4' },
      { label: 'Target', note: 'Reposition · grasp · lift', src: '/media/task274-target.mp4' },
    ],
    reportUrl:
      'https://32-193-64-176.sslip.io/2026-08-12_task-274-mobile-manipulator-base-repositioning-dataset-report',
  },
];

function VideoGrid({ videos, className }: { videos: VideoItem[]; className?: string }) {
  return (
    <div className={cn('video-grid', className, videos.length === 3 && 'video-grid-three')}>
      {videos.map((video) => (
        <figure key={video.src}>
          <div className="video-label">
            <span>{video.label}</span>
            <small>{video.note}</small>
          </div>
          <video controls muted loop playsInline preload="metadata" src={video.src} />
        </figure>
      ))}
    </div>
  );
}

function PromptBlock({ children, compact = false }: { children: React.ReactNode; compact?: boolean }) {
  return (
    <div className={cn('prompt-block', compact && 'prompt-block-compact')}>
      <div className="prompt-icon">P</div>
      <div>
        <p className="prompt-label">Model prompt</p>
        <blockquote>{children}</blockquote>
      </div>
    </div>
  );
}

function RobotCase({
  eyebrow,
  title,
  summary,
  contribution,
  prompt,
  videos,
  reportUrl,
  wide,
}: RobotCaseProps) {
  return (
    <article className={cn('robot-card', wide && 'robot-card-wide')}>
      <div className="robot-card-head">
        <p className="project-label">{eyebrow}</p>
        <h3>{title}</h3>
        <p className="robot-summary">{summary}</p>
      </div>
      <VideoGrid videos={videos} />
      <div className="contribution">
        <span>My contribution</span>
        <p>{contribution}</p>
      </div>
      <PromptBlock compact>{prompt}</PromptBlock>
      <a className="detail-link" href={reportUrl} target="_blank" rel="noreferrer">
        View project evidence <ArrowUpRight aria-hidden="true" />
      </a>
    </article>
  );
}

function GeneratorCard({
  number,
  title,
  concept,
  truePrompt,
  counterfactualPrompt,
  slug,
  status,
}: {
  number: string;
  title: string;
  concept: string;
  truePrompt: string;
  counterfactualPrompt: string;
  slug: 'tether' | 'fan';
  status: string;
}) {
  const videos = [
    { label: 'True', note: 'Physically correct', src: `/media/${slug}-true.mp4` },
    {
      label: 'Counterfactual',
      note: 'One injected error',
      src: `/media/${slug}-counterfactual.mp4`,
    },
    { label: 'Binary mask', note: 'Error target only', src: `/media/${slug}-mask.mp4` },
    { label: 'Mask overlay', note: 'Onset-aligned', src: `/media/${slug}-overlay.mp4` },
  ];

  return (
    <article className="generator-card">
      <header className="generator-head">
        <span className="generator-number">{number}</span>
        <div>
          <p className="project-label">MuJoCo · Counterfactual generator</p>
          <h3>{title}</h3>
        </div>
        <Badge className="generator-status" variant="outline">
          {status}
        </Badge>
      </header>
      <p className="generator-concept">{concept}</p>
      <VideoGrid videos={videos} className="generator-videos" />
      <div className="prompt-compare">
        <div>
          <span>True prompt</span>
          <p>{truePrompt}</p>
        </div>
        <div>
          <span>Counterfactual prompt</span>
          <p>{counterfactualPrompt}</p>
        </div>
      </div>
      <div className="generator-foot">
        <span>One root error</span>
        <span>Matched pre-error state</span>
        <span>4 synchronized streams</span>
        <span>Deterministic replay</span>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main>
      <nav className="site-nav">
        <a className="wordmark" href="#top" aria-label="Vivian Lin portfolio home">
          <span className="wordmark-dot" />
          VIVIAN LIN
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          <a href="#work">Robot work</a>
          <a href="#generators">Generators</a>
          <a href="#review">Review</a>
          <a
            className="nav-github"
            href="https://github.com/vivianlin423-glitch"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </nav>

      <section id="top" className="hero shell">
        <div className="hero-copy">
          <Badge className="eyebrow" variant="outline">
            Video reasoning · Robotics · Simulation
          </Badge>
          <h1>
            Making video reasoning <em>visible, measurable,</em> and physically grounded.
          </h1>
          <p className="hero-lede">
            I build and evaluate video-to-video systems that turn robot behavior into clear,
            reviewable supervision—from real-world interaction data to deterministic physics
            simulations.
          </p>
          <div className="hero-actions">
            <a className={cn(buttonVariants({ size: 'lg' }), 'primary-cta')} href="#work">
              Explore selected work <ArrowDown aria-hidden="true" />
            </a>
            <a
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'secondary-cta')}
              href="https://32-193-64-176.sslip.io/"
              target="_blank"
              rel="noreferrer"
            >
              Research archive <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="signal-panel" aria-label="Portfolio highlights">
          <p className="signal-kicker">Recent work</p>
          <div className="signal-stat">
            <strong>30+</strong>
            <span>formal TV2V / RV2V review decisions</span>
          </div>
          <div className="signal-grid">
            <div><strong>05</strong><span>robot case studies</span></div>
            <div><strong>02</strong><span>physics generators</span></div>
          </div>
          <div className="signal-rule" />
          <p className="signal-note">
            Exact-head review, deterministic rendering, synchronized evidence, and human visual QA.
          </p>
        </aside>
      </section>

      <section id="work" className="featured shell">
        <header className="section-heading">
          <div><span className="section-number">01</span><p>Featured robot task</p></div>
          <h2>Human–robot turn-taking, made legible frame by frame.</h2>
        </header>

        <div className="featured-card">
          <div className="project-meta">
            <div className="project-title-row">
              <div>
                <p className="project-label">Task 385 · TV2V · HABIT</p>
                <h3>Human–Robot Turn-Taking Phase Visualization</h3>
              </div>
              <span className="project-status"><CheckCircle2 aria-hidden="true" /> Real data</span>
            </div>
            <p>
              A real shared-workspace episode becomes a synchronized supervision pair. The target
              preserves every source frame while adding independent Human and Robot timelines,
              current subtasks, and five collaboration phases: human-only, robot-only, both-active,
              waiting, and turn switch.
            </p>
          </div>
          <VideoGrid
            videos={[
              { label: 'Input', note: 'Real RGB · 397 frames', src: '/media/task385-input.mp4' },
              { label: 'Target', note: 'Dual-track phase overlay', src: '/media/task385-target.mp4' },
            ]}
          />
          <div className="featured-lower">
            <div className="contribution contribution-dark">
              <span>My contribution</span>
              <p>
                Defined the five-phase collaboration contract, aligned human and robot subtasks,
                designed a non-occluding dual-track interface, and verified 397/397 synchronized frames.
              </p>
            </div>
            <PromptBlock>
              Preserve every RGB source frame, its order, and the original duration. Append a
              synchronized annotation panel showing Human and Robot subtasks and exactly one
              collaboration phase at every moment.
            </PromptBlock>
          </div>
          <a
            className="detail-link detail-link-dark"
            href="https://32-193-64-176.sslip.io/2026-08-31_task-385-human-robot-turn-taking-phase-visualization-dataset-report"
            target="_blank"
            rel="noreferrer"
          >
            View full report <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="robot-section shell" aria-labelledby="robot-heading">
        <header className="section-heading section-heading-compact">
          <div><span className="section-number">02</span><p>Robot video reasoning</p></div>
          <h2 id="robot-heading">Four more tasks, four different reasoning problems.</h2>
        </header>
        <div className="robot-grid">
          {robotCases.map((project) => <RobotCase key={project.title} {...project} />)}
        </div>
      </section>

      <section id="generators" className="generator-section">
        <div className="shell">
          <header className="section-heading section-heading-light">
            <div><span className="section-number">03</span><p>Counterfactual generators</p></div>
            <h2>One deliberate physics error. Everything else stays accountable.</h2>
          </header>
          <p className="generator-intro">
            Each generator produces four aligned streams—True, Counterfactual, Binary Mask, and
            Mask Overlay—with independent prompts, matched pre-error frames, and a single injected
            operator that can be audited and reproduced.
          </p>
          <div className="generator-stack">
            <GeneratorCard
              number="G–01"
              title="Tether Cut — Circular Motion Persists"
              concept="At the cut, the correct ball exits tangentially and falls. The counterfactual ball keeps orbiting with no visible connection because one hidden tether constraint is retained."
              truePrompt="A fixed camera records a red ball moving rapidly on one taut string under normal gravity. At frame 42 the string breaks into two length-preserving pieces; the ball leaves tangentially, follows a ballistic arc, lands, and remains visible."
              counterfactualPrompt="A fixed camera records the same taut-string demonstration under normal gravity. At frame 42 the string visibly breaks; despite having no connection, the unsupported ball continues along the same horizontal circular path instead of flying tangentially and falling."
              slug="tether"
              status="Iterative prototype"
            />
            <GeneratorCard
              number="G–02"
              title="Onboard Fan–Sail Cart — Missing Reaction"
              concept="A fan and sail live on the same closed cart. The correct internal forces cancel; the counterfactual omits exactly one backward reaction impulse, so the whole cart drifts."
              truePrompt="A fixed camera records a low-friction cart on two rails under normal gravity. A fan and sail face each other inside the same sealed tunnel. At frame 42 the fan spins up; equal internal impulses balance, so the cart remains at its ruler mark."
              counterfactualPrompt="A fixed camera records the same rail-supported cart and sealed onboard fan–sail system. At frame 42 the fan spins up; its backward reaction is missing while the sail impulse remains, so the closed cart coasts right from its ruler mark."
              slug="fan"
              status="Reviewed output"
            />
          </div>
        </div>
      </section>

      <section id="review" className="review-section shell">
        <header className="section-heading section-heading-compact">
          <div><span className="section-number">04</span><p>Human evaluator</p></div>
          <h2>Quality review is part of the research—not a final checkbox.</h2>
        </header>
        <div className="review-layout">
          <div className="review-number">
            <span>30+</span>
            <p>formal review decisions across TV2V and RV2V pull requests</p>
          </div>
          <div className="review-principles">
            <div><ShieldCheck aria-hidden="true" /><h3>Evidence-bound</h3><p>Verified exact code head, evidence package, Owner attestation, reviewer identity, and complete sample checklist before publication.</p></div>
            <div><Eye aria-hidden="true" /><h3>Visual and semantic</h3><p>Caught missing masks, reversed force arrows, material drift, interpenetration, temporal jumps, wrong semantic colors, and pseudo-video made from still frames.</p></div>
            <div><GitPullRequest aria-hidden="true" /><h3>Fresh after revision</h3><p>Re-reviewed replacement evidence from scratch and kept approvals or change requests tied to the exact media that was actually inspected.</p></div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div>
            <Sparkles aria-hidden="true" />
            <p>Video reasoning systems should be understandable enough to inspect—and rigorous enough to trust.</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#top">Back to top</a>
            <a href="https://github.com/vivianlin423-glitch" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://32-193-64-176.sslip.io/" target="_blank" rel="noreferrer">Research archive</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
