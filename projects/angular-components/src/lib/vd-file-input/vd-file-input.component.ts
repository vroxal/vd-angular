import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { VdIconButton } from '../vd-icon-button/vd-icon-button.component';
import { VdTooltipDirective } from '../vd-tooltip/vd-tooltip.directive';

type FileInputLayout = 'horizontal' | 'vertical';

let vdFileInputId = 0;

@Component({
  selector: 'vd-file-input',
  standalone: true,
  imports: [CommonModule, VdIcon, VdIconButton, VdTooltipDirective],
  templateUrl: './vd-file-input.component.html',
  styleUrl: './vd-file-input.component.scss',
})
export class VdFileInput {
  /** Field label displayed above the dropzone */
  @Input() label?: string;

  /** Tooltip content for the help icon (shown when label is present) */
  @Input() hintText?: string;

  /** Whether the field is optional */
  @Input() optional?: boolean;

  /** Layout variant: compact inline or large centered */
  @Input() layout: FileInputLayout = 'horizontal';

  /** Human-readable supported file types label (e.g. ".png, .jpeg") */
  @Input() supportedFiles?: string;

  /** Human-readable supported file types label (e.g. ".png, .jpeg") */
  @Input() supportingText?: string;

  /** Maximum file size label displayed to the user (e.g. "12 MB") */
  @Input() maxSize?: string;

  /** Whether multiple files can be selected */
  @Input() multiple: boolean = false;

  /** Whether the input is disabled */
  @Input() disabled: boolean = false;

  /** Validation state */
  @Input() state: 'error' | null = null;

  /** Helper text shown below the dropzone (e.g. validation message) */
  @Input() helperText?: string;

  /** Emitted when the selected files list changes (add or remove) */
  @Output() filesChange = new EventEmitter<File[]>();

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  /** Internal list of selected files */
  selectedFiles: File[] = [];

  /** Internal drag-over flag */
  isDragOver = false;

  /** Computed unique id */
  inputId = `vd-file-input-${vdFileInputId++}`;

  /** Whether the dropzone should be hidden (single mode with a file selected) */
  get hideDropzone(): boolean {
    return !this.multiple && this.selectedFiles.length > 0;
  }

  /** Open the native file picker */
  openFilePicker(): void {
    if (!this.disabled) {
      this.fileInputRef.nativeElement.click();
    }
  }

  /** Handle file selection via native input */
  onFileSelected(event: Event): void {
    const incoming = Array.from((event.target as HTMLInputElement).files ?? []);
    if (!incoming.length) return;

    if (this.multiple) {
      // Append, de-duplicate by object identity
      const existing = new WeakSet<File>(this.selectedFiles);
      const newFiles = incoming.filter((f) => !existing.has(f));
      this.selectedFiles = [...this.selectedFiles, ...newFiles];
    } else {
      this.selectedFiles = [incoming[0]];
    }

    this.filesChange.emit([...this.selectedFiles]);
    // Reset native input so the same file can be re-selected
    (event.target as HTMLInputElement).value = '';
  }

  /** Remove a specific file from the list */
  removeFile(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.selectedFiles = this.selectedFiles.filter((_, i) => i !== index);
    this.filesChange.emit([...this.selectedFiles]);
  }

  /** Format bytes to human-readable size */
  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  /** Handle dragover */
  onDragOver(event: DragEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  /** Handle dragleave */
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  /** Handle drop */
  onDrop(event: DragEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    const incoming = Array.from(event.dataTransfer?.files ?? []);
    if (!incoming.length) return;

    if (this.multiple) {
      // Append, de-duplicate by object identity
      const existing = new WeakSet<File>(this.selectedFiles);
      const newFiles = incoming.filter((f) => !existing.has(f));
      this.selectedFiles = [...this.selectedFiles, ...newFiles];
    } else {
      this.selectedFiles = [incoming[0]];
    }

    this.filesChange.emit([...this.selectedFiles]);
  }
}
