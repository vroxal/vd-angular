import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { createHighlighter, Highlighter } from 'shiki';
import { VdIcon } from 'vd-angular';

@Component({
  selector: 'code-container',
  standalone: true,
  imports: [CommonModule, VdIcon],
  templateUrl: './code-container.component.html',
  styleUrl: './code-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CodeContainer implements OnChanges {
  @Input() code = '';
  @Input() language:
    | 'angular-html'
    | 'angular-ts'
    | 'html'
    | 'sh'
    | 'ts'
    | 'json5'
    | 'css'
    | 'markdown' = 'angular-html';
  @Input() fileName = '';

  highlightedCode!: SafeHtml;
  currentIcon = 'vd-icon-copy';
  copied = false;
  theme = 'ayu-dark';
  private static highlighter: Highlighter | null = null;
  private static highlighterPromise: Promise<Highlighter> | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['code'] || changes['language']) {
      await this.highlight();
    }
  }

  private async highlight() {
    if (!CodeContainer.highlighterPromise) {
      CodeContainer.highlighterPromise = createHighlighter({
        themes: [this.theme],
        langs: ['angular-ts', 'angular-html', 'html', 'sh', 'ts', 'json5', 'css', 'markdown'],
      });
    }

    if (!CodeContainer.highlighter) {
      CodeContainer.highlighter = await CodeContainer.highlighterPromise;
    }

    let html = CodeContainer.highlighter.codeToHtml(this.code, {
      lang: this.language,
      theme: this.theme,
    });
    html = html.replace(/background-color:[^;"]+;?/g, '');

    this.highlightedCode = this.sanitizer.bypassSecurityTrustHtml(html);

    this.cdr.markForCheck();
  }

  async copyCode() {
    if (this.copied) return; // ⛔ prevent re-entry

    try {
      await navigator.clipboard.writeText(this.code);
      this.setCopiedState();
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = this.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.setCopiedState();
    }
  }

  private setCopiedState() {
    this.currentIcon = 'vd-icon-tick';
    this.copied = true;
    this.cdr.markForCheck();

    setTimeout(() => {
      this.currentIcon = 'vd-icon-copy';
      this.copied = false;
      this.cdr.markForCheck();
    }, 2000);
  }
}
