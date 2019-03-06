import { Binding, NewSignal, SignalRef } from 'vega';
import { Channel, ScaleChannel, SingleDefChannel } from '../../channel';
import { LogicalOperand } from '../../logical';
import { BrushConfig, SelectionDef, SelectionInit, SelectionInitArray, SelectionResolution, SelectionType } from '../../selection';
import { Dict } from '../../util';
import { EventStream, VgData } from '../../vega.schema';
import { DataFlowNode } from '../data/dataflow';
import { TimeUnitNode } from '../data/timeunit';
import { FacetModel } from '../facet';
import { LayerModel } from '../layer';
import { Model } from '../model';
import { UnitModel } from '../unit';
import { SelectionComponent } from './selection';
export declare const STORE = "_store";
export declare const TUPLE = "_tuple";
export declare const MODIFY = "_modify";
export declare const SELECTION_DOMAIN = "_selection_domain_";
export declare const VL_SELECTION_RESOLVE = "vlSelectionResolve";
export interface SelectionComponent<T extends SelectionType = SelectionType> {
    name: string;
    type: T;
    init?: (T extends 'interval' ? SelectionInitArray : T extends 'single' ? SelectionInit : SelectionInit | SelectionInit[])[];
    events: EventStream;
    bind?: 'scales' | Binding | Dict<Binding>;
    resolve: SelectionResolution;
    empty: 'all' | 'none';
    mark?: BrushConfig;
    _signalNames: {};
    project?: ProjectSelectionComponent[];
    fields?: {
        [c in SingleDefChannel]?: string;
    };
    timeUnit?: TimeUnitNode;
    scales?: ScaleChannel[];
    toggle?: any;
    translate?: any;
    zoom?: any;
    nearest?: any;
}
export declare type TupleStoreType = 'E' | 'R' | 'R-RE';
export interface ProjectSelectionComponent {
    field?: string;
    channel?: SingleDefChannel;
    type: TupleStoreType;
}
export interface SelectionCompiler<T extends SelectionType = SelectionType> {
    signals: (model: UnitModel, selCmpt: SelectionComponent<T>) => NewSignal[];
    topLevelSignals?: (model: Model, selCmpt: SelectionComponent<T>, signals: NewSignal[]) => NewSignal[];
    modifyExpr: (model: UnitModel, selCmpt: SelectionComponent<T>) => string;
    marks?: (model: UnitModel, selCmpt: SelectionComponent<T>, marks: any[]) => any[];
}
export declare function parseUnitSelection(model: UnitModel, selDefs: Dict<SelectionDef>): Dict<SelectionComponent<any>>;
export declare function assembleUnitSelectionSignals(model: UnitModel, signals: any[]): any[];
export declare function assembleFacetSignals(model: FacetModel, signals: any[]): any[];
export declare function assembleTopLevelSignals(model: UnitModel, signals: any[]): any[];
export declare function assembleUnitSelectionData(model: UnitModel, data: VgData[]): VgData[];
export declare function assembleUnitSelectionMarks(model: UnitModel, marks: any[]): any[];
export declare function assembleLayerSelectionMarks(model: LayerModel, marks: any[]): any[];
export declare function selectionPredicate(model: Model, selections: LogicalOperand<string>, dfnode?: DataFlowNode): string;
export declare function isRawSelectionDomain(domainRaw: SignalRef): boolean;
export declare function selectionScaleDomain(model: Model, domainRaw: SignalRef): SignalRef;
export declare function unitName(model: Model): string;
export declare function requiresSelectionId(model: Model): boolean;
export declare function channelSignalName(selCmpt: SelectionComponent, channel: Channel, range: 'visual' | 'data'): any;
export declare function positionalProjections(selCmpt: SelectionComponent): {
    x: ProjectSelectionComponent;
    xi: number;
    y: ProjectSelectionComponent;
    yi: number;
};
export declare function assembleInit(init: (SelectionInit | SelectionInit[] | SelectionInitArray)[] | SelectionInit, wrap?: (str: string) => string): string;
